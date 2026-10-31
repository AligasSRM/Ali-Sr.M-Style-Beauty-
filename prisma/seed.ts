import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const products = [
    {
      name: 'Velvet Studio Set',
      slug: 'velvet-studio-set',
      category: 'Fashion',
      price: 129,
      rating: 4.8,
      image:
        'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80',
      description: 'A premium styling set designed for elevated everyday looks and social-ready elegance.',
      badge: 'Best Seller',
    },
    {
      name: 'Aura Glow Kit',
      slug: 'aura-glow-kit',
      category: 'Beauty',
      price: 89,
      rating: 4.7,
      image:
        'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
      description: 'Glow-focused essentials featuring hydration, finish, and a radiant finish for all skin tones.',
      badge: 'New',
    },
    {
      name: 'Sculpt Street Sneaker',
      slug: 'sculpt-street-sneaker',
      category: 'Accessories',
      price: 149,
      rating: 4.6,
      image:
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80',
      description: 'Comfort and street-edge look in a modern silhouette for everyday styling.',
      badge: 'Trending',
    },
    {
      name: 'Luna Tailor Canvas',
      slug: 'luna-tailor-canvas',
      category: 'AI Design',
      price: 199,
      rating: 4.9,
      image:
        'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80',
      description: 'A digital design concept pack for personalized outfit generation and tailored styling ideas.',
      badge: 'AI Pick',
    },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: product,
      create: product,
    });
  }

  const user = await prisma.user.upsert({
    where: { email: 'demo@ali-sr.com' },
    update: { name: 'Demo Shopper' },
    create: {
      name: 'Demo Shopper',
      email: 'demo@ali-sr.com',
    },
  });

  const product = await prisma.product.findFirst({
    where: { slug: 'velvet-studio-set' },
  });

  if (product) {
    await prisma.order.create({
      data: {
        userId: user.id,
        total: product.price,
        status: 'paid',
        items: {
          create: {
            productId: product.id,
            quantity: 1,
            unitPrice: product.price,
          },
        },
      },
    });
  }

  console.log('Seed complete');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
