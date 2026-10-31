import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '@/lib/prisma';

export type AuthRole = 'USER' | 'ADMIN';

export type AuthUser = {
  id: string;
  email: string;
  role: AuthRole;
  name?: string;
};

export function getJwtSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.trim().length === 0) {
    throw new Error('JWT_SECRET is not configured.');
  }

  return secret;
}

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export function signUserToken(user: { id: string; email: string; role?: AuthRole; name?: string }) {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role || 'USER', name: user.name },
    getJwtSecret(),
    { expiresIn: '7d' },
  );
}

export function verifyUserToken(token: string): AuthUser {
  return jwt.verify(token, getJwtSecret()) as AuthUser;
}

export function getTokenFromRequest(request: Request) {
  const authorizationHeader = request.headers.get('authorization');
  if (authorizationHeader?.startsWith('Bearer ')) {
    return authorizationHeader.slice('Bearer '.length).trim();
  }

  const cookieHeader = request.headers.get('cookie') ?? '';
  const match = cookieHeader
    .split(';')
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith('ali_sr_token='));

  if (!match) {
    return null;
  }

  return decodeURIComponent(match.slice('ali_sr_token='.length));
}

export async function getCurrentUserFromRequest(request: Request) {
  const token = getTokenFromRequest(request);
  if (!token) {
    return null;
  }

  try {
    const payload = verifyUserToken(token);
    return prisma.user.findUnique({
      where: { id: payload.id },
    });
  } catch {
    return null;
  }
}

export async function requireUser(request: Request) {
  const user = await getCurrentUserFromRequest(request);
  if (!user) {
    throw new Error('Unauthorized');
  }

  return user;
}

export async function requireAdmin(request: Request) {
  const user = await requireUser(request);
  if (user.role !== 'ADMIN') {
    throw new Error('Forbidden');
  }

  return user;
}

export async function createUser({ name, email, password }: { name: string; email: string; password: string }) {
  const normalizedEmail = email.trim().toLowerCase();
  const existing = await prisma.user.findUnique({ where: { email: normalizedEmail } });
  if (existing) {
    throw new Error('User already exists');
  }

  const passwordHash = await hashPassword(password);

  return prisma.user.create({
    data: {
      name: name.trim(),
      email: normalizedEmail,
      passwordHash,
      role: 'USER',
    },
  });
}
