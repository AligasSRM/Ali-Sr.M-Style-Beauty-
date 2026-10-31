import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword } from '@/lib/auth';

export async function POST(request: Request) {
  const body = await request.json();

  if (!body.name || !body.email || !body.password) {
    return NextResponse.json(
      { success: false, message: 'Name, email and password are required.' },
      { status: 400 },
    );
  }

  const existing = await prisma.user.findUnique({
    where: { email: body.email },
  });

  if (existing) {
    return NextResponse.json(
      { success: false, message: 'User already exists.' },
      { status: 409 },
    );
  }

  const user = await prisma.user.create({
    data: {
      name: String(body.name),
      email: String(body.email),
      passwordHash: await hashPassword(String(body.password)),
      role: 'USER',
    },
  });

  return NextResponse.json(
    {
      success: true,
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    },
    { status: 201 },
  );
}
