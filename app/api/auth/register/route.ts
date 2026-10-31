import { NextResponse } from 'next/server';
import { createUser } from '@/lib/auth';

export async function POST(request: Request) {
  const body = await request.json();

  try {
    const user = await createUser({
      name: body.name,
      email: body.email,
      password: body.password,
    });

    return NextResponse.json({
      success: true,
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : 'Registration failed' },
      { status: 400 },
    );
  }
}
