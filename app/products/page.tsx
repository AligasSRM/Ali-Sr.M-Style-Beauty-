import Link from 'next/link';
import ProductGrid from '@/components/ProductGrid';

export default function HomePage() {
  return (
    <main className="page-shell">
      <section className="hero-section">
        <div>
          <p className="eyebrow">Style x AI</p>
          <h1>Curated looks, beauty essentials, and elevated everyday staples.</h1>
          <p className="lead">
            Discover premium fashion, skincare, and contemporary essentials built for confidence,
            creativity, and a polished lifestyle.
          </p>
          <div className="hero-actions">
            <Link href="/products" className="primary-button">
              Shop now
            </Link>
            <Link href="/studio" className="secondary-button">
              Explore Studio
            </Link>
          </div>
        </div>
        <div className="panel stats-card">
          <div><span>Best sellers</span><strong>24</strong></div>
          <div><span>New arrivals</span><strong>8</strong></div>
          <div><span>Avg. rating</span><strong>4.8</strong></div>
          <div><span>Members</span><strong>12k</strong></div>
        </div>
      </section>

      <section className="section-block">
        <div className="section-header">
          <h2>Featured collection</h2>
          <Link href="/products" className="ghost-button">View all</Link>
        </div>
        <ProductGrid />
      </section>
    </main>
  );
}
