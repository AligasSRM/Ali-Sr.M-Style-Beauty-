import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const product = await prisma.product.findUnique({
    where: { id: params.id },
  });

  if (!product) {
    return NextResponse.json({ success: false, message: 'Product not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true, data: product });
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    await requireAdmin(request);
  } catch {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const slugValue = String(body.slug ?? body.name ?? '').trim();

  try {
    const product = await prisma.product.update({
      where: { id: params.id },
      data: {
        name: body.name ? String(body.name).trim() : undefined,
        slug: slugValue ? slugValue.toLowerCase().replace(/\s+/g, '-') : undefined,
        category: body.category ? String(body.category).trim() : undefined,
        price: body.price !== undefined ? Number(body.price) : undefined,
        rating: body.rating !== undefined ? Number(body.rating || 0) : undefined,
        image: body.image ? String(body.image) : undefined,
        description: body.description ? String(body.description).trim() : undefined,
        badge: body.badge !== undefined ? String(body.badge).trim() : undefined,
        stock: body.stock !== undefined ? Number(body.stock || 0) : undefined,
      },
    });

    return NextResponse.json({ success: true, data: product });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : 'Unable to update product' },
      { status: 400 },
    );
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await requireAdmin(request);
  } catch {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    await prisma.product.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : 'Unable to delete product' },
      { status: 400 },
    );
  }
}
