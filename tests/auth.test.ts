'use client';

import Link from 'next/link';
import { useCart } from './CartProvider';
import products, { formatPrice } from '@/lib/products';

export function ProductGrid({ items = products }: { items?: typeof products }) {
  return (
    <div className="product-grid">
      {items.map((product) => (
        <article key={product.id} className="product-card panel">
          <Link href={`/product/${product.id}`}>
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
              <strong>{formatPrice(product.price)}</strong>
              <div className="rating-pill">★ {product.rating}</div>
            </div>
            <div className="card-actions">
              <Link href={`/product/${product.id}`} className="secondary-button small-button">
                Details
              </Link>
              <AddToCartButton productId={product.id} />
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

export function AddToCartButton({ productId }: { productId: string }) {
  const { addToCart } = useCart();

  return (
    <button className="primary-button small-button" onClick={() => addToCart(productId)}>
      Add to cart
    </button>
  );
}
