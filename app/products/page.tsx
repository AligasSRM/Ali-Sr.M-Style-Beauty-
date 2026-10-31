import Link from 'next/link';
import { ProductGrid } from '@/components/ProductGrid';
import { getAllProducts } from '@/lib/catalog';

export default async function ProductsPage() {
  const products = await getAllProducts();

  return (
    <main className="page-shell">
      <section className="section-block">
        <div className="section-header">
          <div>
            <p className="eyebrow">Marketplace</p>
            <h1>Fashion & Beauty Collection</h1>
          </div>
          <Link href="/cart" className="secondary-button">Open cart</Link>
        </div>
        <ProductGrid items={products} />
      </section>
    </main>
  );
}
