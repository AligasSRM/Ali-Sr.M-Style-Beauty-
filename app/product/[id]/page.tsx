import Link from 'next/link';
import products, { formatPrice, getProductById } from '@/lib/products';
import { AddToCartButton } from '@/components/CartProvider';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = getProductById(params.id) ?? products[0];

  if (!product) {
    return (
      <main className="page-shell">
        <div className="panel empty-card">
          <h1>Product not found</h1>
          <Link href="/products" className="primary-button">Back to catalog</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="page-shell">
      <section className="product-layout">
        <div className="product-image-wrap panel">
          <img src={product.image} alt={product.name} className="product-image" />
        </div>

        <div className="product-details panel">
          <span className="badge">{product.badge}</span>
          <h1>{product.name}</h1>
          <p className="product-rating">★★★★★ {product.rating} / 5</p>
          <p className="price-tag">{formatPrice(product.price)}</p>
          <p>{product.description}</p>

          <ul className="feature-list">
            {product.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>

          <div className="product-actions">
            <AddToCartButton productId={product.id} />
            <Link href="/products" className="secondary-button">Continue shopping</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
