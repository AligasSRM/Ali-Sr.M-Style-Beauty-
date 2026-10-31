import { prisma } from '@/lib/prisma';

export async function getProductStats() {
  const totalProducts = await prisma.product.count();
  const totalOrders = await prisma.order.count();
  return { totalProducts, totalOrders };
}
