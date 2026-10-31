'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
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
  stock: number;
};

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, clearCart } = useCart();
  const [catalog, setCatalog] = useState<Product[]>([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch('/api/products')
      .then((response) => response.json())
      .then((data) => setCatalog(data?.data ?? []))
      .catch(() => setCatalog([]));
  }, []);

  const cartItems = useMemo(
    () =>
      items
        .map((item) => {
          const product = catalog.find((entry) => entry.id === item.id);
          if (!product) {
            return null;
          }

          return { ...product, quantity: item.quantity };
        })
        .filter(Boolean) as Array<Product & { quantity: number }>,
    [items, catalog],
  );

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  async function handleCheckout() {
    if (!cartItems.length) {
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cartItems.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
          })),
        }),
      });

      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Checkout failed');
      }

      clearCart();
      window.location.href = '/products';
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Checkout failed');
    } finally {
      setSubmitting(false);
    }
  }

  if (!cartItems.length) {
    return (
      <main className="page-shell">
        <div className="panel empty-cart">
          <h1>Your cart is empty</h1>
          <p>Add products from the collection to continue.</p>
          <Link href="/products" className="primary-button">
            Shop collection
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="page-shell cart-page">
      <section className="cart-list panel">
        <h1>Shopping cart</h1>
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.name} className="cart-thumb" />
            <div className="cart-copy">
              <h3>{item.name}</h3>
              <span>{item.category}</span>
            </div>
            <div className="cart-controls">
              <button type="button" onClick={() => updateQuantity(item.id, -1)}>-</button>
              <strong>{item.quantity}</strong>
              <button type="button" onClick={() => updateQuantity(item.id, 1)}>+</button>
            </div>
            <strong>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(item.price * item.quantity)}</strong>
            <button type="button" className="ghost-button" onClick={() => removeFromCart(item.id)}>
              Remove
            </button>
          </div>
        ))}
      </section>

      <aside className="panel checkout-panel">
        <h2>Checkout</h2>
        <div className="checkout-total">
          <span>Total</span>
          <strong>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalPrice)}</strong>
        </div>

        <button type="button" className="primary-button" onClick={handleCheckout} disabled={submitting}>
          {submitting ? 'Processing...' : 'Place order'}
        </button>
      </aside>
    </main>
  );
}
