import Link from 'next/link';
import { ProductGrid } from '@/components/ProductGrid';
import products from '@/lib/products';

export default function HomePage() {
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

      <section className="section-block two-column">
        <div className="panel feature-panel">
          <p className="eyebrow">AI Styling</p>
          <h3>Virtual look design</h3>
          <p>
            Upload a photo, compare outfit concepts, and generate style suggestions based on your mood, event, and wardrobe.
          </p>
          <Link href="/style" className="text-link">Open style center</Link>
        </div>

        <div className="panel feature-panel">
          <p className="eyebrow">Commerce</p>
          <h3>Curated storefront</h3>
          <p>
            Built for products, carts, order flow, and premium retail experiences with simplified operations for launch.
          </p>
          <Link href="/products" className="text-link">Browse storefront</Link>
        </div>
      </section>
    </main>
  );
}
