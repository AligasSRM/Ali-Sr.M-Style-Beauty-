import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const body = await request.json();

  const order = await prisma.order.create({
    data: {
      userId: body.userId ?? 'demo-user',
      total: Number(body.total ?? 0),
      status: 'pending',
      items: {
        create: (body.items ?? []).map((item: any) => ({
          productId: item.productId,
          quantity: Number(item.quantity ?? 1),
          unitPrice: Number(item.unitPrice ?? 0),
        })),
      },
    },
  });

  return NextResponse.json({ success: true, data: order });
}
