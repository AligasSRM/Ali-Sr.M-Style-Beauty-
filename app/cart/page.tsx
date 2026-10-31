'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useCart } from '@/components/CartProvider';

type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  image: string;
  description: string;
  badge: string;
  stock?: number;
};

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/products/${params.id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data?.data || null))
      .finally(() => setLoading(false));
  }, [params.id]);

  if (loading) {
    return <main className="page-shell"><div className="panel">Loading product...</div></main>;
  }

  if (!product) {
    return <main className="page-shell"><div className="panel">Product not found.</div></main>;
  }

  return (
    <main className="page-shell product-detail-page">
      <div className="product-detail-card panel">
        <img src={product.image} alt={product.name} className="product-detail-image" />

        <div className="product-detail-content">
          <p className="eyebrow">{product.category}</p>
          <h1>{product.name}</h1>
          <div className="product-detail-meta">
            <span className="badge">{product.badge}</span>
            <span className="rating-pill">★ {product.rating}</span>
          </div>
          <p className="lead">{product.description}</p>

          <div className="product-price-row">
            <strong>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(product.price)}</strong>
            <span>{product.stock ?? 0} in stock</span>
          </div>

          <div className="hero-actions">
            <button className="primary-button" onClick={() => addToCart(product.id)}>
              Add to cart
            </button>
            <Link href="/products" className="secondary-button">Continue shopping</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
