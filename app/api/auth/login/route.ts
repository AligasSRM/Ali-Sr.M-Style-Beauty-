import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireUser } from '@/lib/auth';
import { createOrderFromCart } from '@/lib/checkout';

export async function GET(request: Request) {
  const user = await requireUser(request);
  const orders = await prisma.order.findMany({
    where: user.role === 'ADMIN' ? {} : { userId: user.id },
    include: { items: true },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json({ success: true, data: orders });
}

export async function POST(request: Request) {
  try {
    const user = await requireUser(request);
    const body = await request.json().catch(() => ({}));
    const items = Array.isArray(body.items) ? body.items : [];
    const order = await createOrderFromCart(user.id, items, String(body.status ?? 'pending'));

    return NextResponse.json({ success: true, data: order }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to create order';
    const status = message === 'Unauthorized' ? 401 : message === 'Forbidden' ? 403 : 400;

    return NextResponse.json({ success: false, message }, { status });
  }
}
