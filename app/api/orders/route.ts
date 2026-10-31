import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUserFromRequest } from '@/lib/auth';

export async function GET(request: Request) {
  const user = await getCurrentUserFromRequest(request);
  if (!user) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  const orders = await prisma.order.findMany({
    where: user.role === 'ADMIN' ? {} : { userId: user.id },
    include: { items: true },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json({ success: true, data: orders });
}

export async function POST(request: Request) {
  try {
    const user = await getCurrentUserFromRequest(request);
    if (!user) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json().catch(() => ({}));
    const items = Array.isArray(body.items) ? body.items : [];
    const total = Number(body.total ?? 0);

    if (!items.length) {
      return NextResponse.json({ success: false, message: 'Cart is empty.' }, { status: 400 });
    }

    const productRecords = await Promise.all(
      items.map(async (item: any) => {
        const product = await prisma.product.findUnique({ where: { id: String(item.productId) } });
        if (!product) {
          throw new Error(`Product not found: ${item.productId}`);
        }

        return {
          product,
          quantity: Number(item.quantity ?? 1),
        };
      }),
    );

    const order = await prisma.order.create({
      data: {
        userId: user.id,
        total: Number(total || productRecords.reduce((sum, value) => sum + value.product.price * value.quantity, 0)),
        status: String(body.status ?? 'pending'),
        items: {
          create: productRecords.map((entry) => ({
            productId: entry.product.id,
            quantity: Number(entry.quantity ?? 1),
            unitPrice: entry.product.price,
          })),
        },
      },
      include: { items: true },
    });

    return NextResponse.json({ success: true, data: order }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to create order';
    return NextResponse.json({ success: false, message }, { status: 400 });
  }
}
