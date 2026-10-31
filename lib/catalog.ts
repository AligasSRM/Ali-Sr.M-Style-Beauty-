import { prisma } from '@/lib/prisma';
import staticProducts, { type Product } from '@/lib/products';

export async function getAllProducts(): Promise<Product[]> {
  try {
    const rows = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
    });

    if (!rows.length) {
      return staticProducts;
    }

    return rows.map((row, index) => ({
      id: row.id,
      name: row.name,
      category: row.category || 'Fashion',
      price: Number(row.price),
      rating: Number(row.rating || 0),
      image: row.image,
      description: row.description,
      badge: row.badge || 'New',
      features:
        staticProducts[index % staticProducts.length]?.features || [
          'Premium quality',
          'Modern style',
          'AI-ready experience',
        ],
    }));
  } catch (error) {
    console.warn('Falling back to static catalog data:', error);
    return staticProducts;
  }
}

export async function getProductByCatalogId(id: string): Promise<Product | undefined> {
  try {
    const row = await prisma.product.findUnique({
      where: { id },
    });

    if (!row) {
      return staticProducts.find((product) => product.id === id);
    }

    return {
      id: row.id,
      name: row.name,
      category: row.category || 'Fashion',
      price: Number(row.price),
      rating: Number(row.rating || 0),
      image: row.image,
      description: row.description,
      badge: row.badge || 'New',
      features:
        staticProducts.find((product) => product.name === row.name)?.features || [
          'Premium quality',
          'Modern style',
          'AI-ready experience',
        ],
    };
  } catch (error) {
    console.warn('Falling back to static product data:', error);
    return staticProducts.find((product) => product.id === id);
  }
}
