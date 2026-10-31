import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const orders = await prisma.order.findMany({
    include: { items: true },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json({ success: true, data: orders });
}

export async function POST(request: Request) {
  const body = await request.json();

  const order = await prisma.order.create({
    data: {
      userId: String(body.userId || 'demo-user'),
      total: Number(body.total || 0),
      status: String(body.status || 'pending'),
      items: {
        create: (body.items || []).map((item: { productId: string; quantity: number; unitPrice: number }) => ({
          productId: item.productId,
          quantity: Number(item.quantity || 1),
          unitPrice: Number(item.unitPrice || 0),
        })),
      },
    },
  });

  return NextResponse.json({ success: true, data: order }, { status: 201 });
}
