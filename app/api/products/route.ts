import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

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
  const body = await request.json();

  const product = await prisma.product.update({
    where: { id: params.id },
    data: {
      name: body.name,
      slug: body.slug,
      category: body.category,
      price: Number(body.price),
      rating: Number(body.rating || 0),
      image: body.image,
      description: body.description,
      badge: body.badge,
      stock: Number(body.stock || 0),
    },
  });

  return NextResponse.json({ success: true, data: product });
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await prisma.product.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
}
