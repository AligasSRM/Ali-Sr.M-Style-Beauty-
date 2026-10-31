import { prisma } from '@/lib/prisma';

export async function getAdminDashboardData() {
  const [products, orders, users] = await Promise.all([
    prisma.product.count(),
    prisma.order.count(),
    prisma.user.count(),
  ]);

  return { products, orders, users };
}
