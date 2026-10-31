import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '@/lib/prisma';

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export function signUserToken(user: { id: string; email: string; role?: string }) {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role || 'USER' },
    process.env.JWT_SECRET || 'dev-secret',
    { expiresIn: '7d' },
  );
}

export function verifyUserToken(token: string) {
  return jwt.verify(token, process.env.JWT_SECRET || 'dev-secret');
}

export async function createUser({ name, email, password }: { name: string; email: string; password: string }) {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    throw new Error('User already exists');
  }

  const passwordHash = await hashPassword(password);

  return prisma.user.create({
    data: {
      name,
      email,
      passwordHash,
      role: 'USER',
    },
  });
}
