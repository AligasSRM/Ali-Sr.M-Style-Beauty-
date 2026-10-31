'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  image: string;
  description: string;
  badge: string;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => setProducts(data?.data || []))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <main className="page-shell"><div className="panel">Loading products...</div></main>;
  }

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

        <div className="product-grid">
          {products.map((product) => (
            <article key={product.id} className="product-card panel">
              <Link href={`/products/${product.id}`}>
                <img src={product.image} alt={product.name} className="product-thumb" />
              </Link>
              <div className="product-card-body">
                <div className="product-topline">
                  <span>{product.category}</span>
                  <span className="badge mini">{product.badge}</span>
                </div>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <div className="product-footer">
                  <strong>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(product.price)}</strong>
                  <div className="rating-pill">★ {product.rating}</div>
                </div>
                <div className="card-actions">
                  <Link href={`/products/${product.id}`} className="secondary-button small-button">
                    Details
                  </Link>
                  <Link href={`/products/${product.id}`} className="primary-button small-button">
                    Add to cart
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
