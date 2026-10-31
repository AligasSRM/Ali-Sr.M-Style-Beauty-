import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';

export async function GET() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json({ success: true, data: products });
}

export async function POST(request: Request) {
  try {
    await requireAdmin(request);
  } catch {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const name = String(body.name ?? '').trim();
  const slugValue = String(body.slug ?? body.name ?? '').trim();
  const category = String(body.category ?? 'Fashion').trim();
  const description = String(body.description ?? 'Product description').trim();
  const image = String(body.image ?? 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80');
  const badge = String(body.badge ?? 'New').trim();
  const price = Number(body.price ?? 0);
  const rating = Number(body.rating ?? 0);
  const stock = Number(body.stock ?? 0);

  if (!name) {
    return NextResponse.json({ success: false, message: 'Product name is required.' }, { status: 400 });
  }

  const slug = (slugValue || name).toLowerCase().replace(/\s+/g, '-');

  const product = await prisma.product.create({
    data: {
      name,
      slug,
      category: category || 'Fashion',
      price,
      rating,
      image,
      description,
      badge: badge || 'New',
      stock,
    },
  });

  return NextResponse.json({ success: true, data: product }, { status: 201 });
}
