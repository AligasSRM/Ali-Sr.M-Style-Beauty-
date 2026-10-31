import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json({
    success: true,
    data: products,
  });
}

export async function POST(request: Request) {
  const body = await request.json();

  const product = await prisma.product.create({
    data: {
      name: String(body.name || 'New Product'),
      slug: String(body.slug || body.name?.toLowerCase().replace(/\s+/g, '-') || 'new-product'),
      category: String(body.category || 'Fashion'),
      price: Number(body.price || 0),
      rating: Number(body.rating || 0),
      image: String(body.image || 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80'),
      description: String(body.description || 'New product added to the storefront. '),
      badge: String(body.badge || 'New'),
    },
  });

  return NextResponse.json({ success: true, data: product }, { status: 201 });
}
