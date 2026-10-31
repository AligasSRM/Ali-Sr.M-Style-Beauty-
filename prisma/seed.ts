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
      image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80',
      description: 'Premium elegant fashion set.',
      badge: 'Best Seller',
      stock: 20,
    },
    {
      name: 'Aura Glow Kit',
      slug: 'aura-glow-kit',
      category: 'Beauty',
      price: 89,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
      description: 'Glow-focused beauty essentials.',
      badge: 'New',
      stock: 10,
    },
    {
      name: 'Sculpt Street Sneaker',
      slug: 'sculpt-street-sneaker',
      category: 'Accessories',
      price: 149,
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80',
      description: 'Modern streetwear sneaker.',
      badge: 'Trending',
      stock: 15,
    },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: product,
      create: product,
    });
  }

  const demoUser = await prisma.user.upsert({
    where: { email: 'demo@ali-sr.com' },
    update: {},
    create: {
      name: 'Demo User',
      email: 'demo@ali-sr.com',
      passwordHash: '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92b9s3mHqQXf2W7KpJQy2',
      role: 'USER',
    },
  });

  console.log('Seed complete', { demoUser: demoUser.email });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
