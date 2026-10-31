import { prisma } from '@/lib/prisma';

export type CartLine = {
  productId: string;
  quantity: number;
};

export async function createOrderFromCart(userId: string, items: CartLine[], status = 'pending') {
  const normalizedItems = (items ?? []).map((item) => ({
    productId: String(item.productId),
    quantity: Number(item.quantity ?? 1),
  }));

  if (!normalizedItems.length) {
    throw new Error('Cart is empty.');
  }

  return prisma.$transaction(async (tx) => {
    const productRecords = await Promise.all(
      normalizedItems.map(async (item) => {
        const product = await tx.product.findUnique({ where: { id: item.productId } });

        if (!product) {
          throw new Error(`Product not found: ${item.productId}`);
        }

        if (!Number.isFinite(item.quantity) || item.quantity <= 0) {
          throw new Error(`Invalid quantity for product: ${item.productId}`);
        }

        if (product.stock < item.quantity) {
          throw new Error(`Insufficient stock for product: ${product.name}`);
        }

        return { ...product, quantity: item.quantity };
      }),
    );

    const total = productRecords.reduce((sum, product) => sum + product.price * product.quantity, 0);

    const order = await tx.order.create({
      data: {
        userId,
        total,
        status,
        items: {
          create: productRecords.map((product) => ({
            productId: product.id,
            quantity: product.quantity,
            unitPrice: product.price,
          })),
        },
      },
      include: {
        items: true,
      },
    });

    await Promise.all(
      productRecords.map((product) =>
        tx.product.update({
          where: { id: product.id },
          data: { stock: { decrement: product.quantity } },
        }),
      ),
    );

    return order;
  });
}
