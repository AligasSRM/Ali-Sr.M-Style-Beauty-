import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';

export type AuthUser = {
  id: string;
  email: string;
  role: string;
  name: string;
};

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export function signUserToken(user: AuthUser) {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role || 'USER', name: user.name },
    process.env.JWT_SECRET || 'dev-secret',
    { expiresIn: '7d' },
  );
}

export function verifyUserToken(token: string): AuthUser {
  return jwt.verify(token, process.env.JWT_SECRET || 'dev-secret') as AuthUser;
}

export async function createUser({ name, email, password }: { name: string; email: string; password: string }) {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    throw new Error('User already exists');
  }

  return prisma.user.create({
    data: {
      name,
      email,
      passwordHash: await hashPassword(password),
      role: 'USER',
    },
  });
}

export function getCurrentUser() {
  const token = cookies().get('ali_sr_token')?.value;
  if (!token) return null;

  try {
    return verifyUserToken(token);
  } catch {
    return null;
  }
}
