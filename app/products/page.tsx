import Link from 'next/link';
import products from '@/lib/products';
import { ProductGrid } from '@/components/ProductGrid';

export default function ProductsPage() {
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
