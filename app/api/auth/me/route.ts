import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createUser } from '@/lib/auth';

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const name = String(body.name ?? '').trim();
  const email = String(body.email ?? '').trim().toLowerCase();
  const password = String(body.password ?? '');

  if (!name || !email || !password) {
    return NextResponse.json(
      { success: false, message: 'Name, email and password are required.' },
      { status: 400 },
    );
  }

  try {
    const user = await createUser({ name, email, password });
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
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to register user.';
    const status = message === 'User already exists' ? 409 : 400;

    return NextResponse.json({ success: false, message }, { status });
  }
}
