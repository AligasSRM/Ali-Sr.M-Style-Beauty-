'use client';

import Link from 'next/link';
import { useCart } from '@/components/CartProvider';
import products, { formatPrice } from '@/lib/products';

export default function CartPage() {
  const { items, totalPrice, totalItems, updateQuantity, removeFromCart } = useCart();

  const cartProducts = items
    .map((item) => {
      const product = products.find((entry) => entry.id === item.id);
      if (!product) return null;
      return { ...product, quantity: item.quantity };
    })
    .filter(Boolean) as Array<{ id: string; name: string; price: number; image: string; quantity: number }>;

  return (
    <main className="page-shell">
      <section className="section-block">
        <div className="section-header">
          <div>
            <p className="eyebrow">Shopping cart</p>
            <h1>{totalItems} item(s) selected</h1>
          </div>
          <Link href="/products" className="secondary-button">Keep shopping</Link>
        </div>

        {cartProducts.length === 0 ? (
          <div className="panel empty-card">
            <h2>Your cart is empty</h2>
            <p>Explore the catalog and begin your style journey.</p>
            <Link href="/products" className="primary-button">Browse products</Link>
          </div>
        ) : (
          <div className="cart-layout">
            <div className="cart-items">
              {cartProducts.map((product) => (
                <div key={product.id} className="panel cart-item">
                  <img src={product.image} alt={product.name} className="mini-product-image" />
                  <div className="cart-item-meta">
                    <h3>{product.name}</h3>
                    <p>{formatPrice(product.price)}</p>
                  </div>
                  <div className="quantity-controls">
                    <button onClick={() => updateQuantity(product.id, -1)}>-</button>
                    <span>{product.quantity}</span>
                    <button onClick={() => updateQuantity(product.id, 1)}>+</button>
                  </div>
                  <button className="remove-button" onClick={() => removeFromCart(product.id)}>Remove</button>
                </div>
              ))}
            </div>

            <aside className="panel summary-card">
              <h2>Order summary</h2>
              <div className="summary-row">
                <span>Subtotal</span>
                <strong>{formatPrice(totalPrice)}</strong>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <strong>Free</strong>
              </div>
              <div className="summary-row total-row">
                <span>Total</span>
                <strong>{formatPrice(totalPrice)}</strong>
              </div>
              <button className="primary-button full-width">Proceed to checkout</button>
            </aside>
          </div>
        )}
      </section>
    </main>
  );
}
