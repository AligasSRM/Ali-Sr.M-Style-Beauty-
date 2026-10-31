import Link from 'next/link';
import { ProductGrid } from '@/components/ProductGrid';
import { getAllProducts } from '@/lib/catalog';

export default async function HomePage() {
  const products = await getAllProducts();
  const featured = products.slice(0, 3);

  return (
    <main className="page-shell">
      <section className="hero-section">
        <div>
          <p className="eyebrow">Style-driven commerce</p>
          <h1>Ali Sr.M – Style & Beauty</h1>
          <p className="lead">
            Explore personalized looks, AI-assisted styling, and premium fashion essentials in one premium platform.
          </p>
          <div className="hero-actions">
            <Link href="/products" className="primary-button">Shop collection</Link>
            <Link href="/studio" className="secondary-button">Try AI studio</Link>
          </div>
        </div>

        <div className="stats-card panel">
          <div>
            <span>AI style matches</span>
            <strong>12.4k</strong>
          </div>
          <div>
            <span>Conversion lift</span>
            <strong>+38%</strong>
          </div>
          <div>
            <span>Avg. order</span>
            <strong>$146</strong>
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="section-header">
          <div>
            <p className="eyebrow">Featured</p>
            <h2>Trending products</h2>
          </div>
          <Link href="/products" className="text-link">View all</Link>
        </div>
        <ProductGrid items={featured} />
      </section>
    </main>
  );
}
