import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const product = await prisma.product.findUnique({
    where: { id: params.id },
  });

  if (!product) {
    return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true, data: product });
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json();

  const product = await prisma.product.update({
    where: { id: params.id },
    data: {
      name: body.name,
      slug: body.slug,
      category: body.category,
      price: body.price !== undefined ? Number(body.price) : undefined,
      rating: body.rating !== undefined ? Number(body.rating) : undefined,
      image: body.image,
      description: body.description,
      badge: body.badge,
      stock: body.stock !== undefined ? Number(body.stock) : undefined,
    },
  });

  return NextResponse.json({ success: true, data: product });
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await prisma.product.delete({
    where: { id: params.id },
  });

  return NextResponse.json({ success: true, data: { id: params.id } });
}
