'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { useCart } from '@/components/CartProvider';

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
};

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, clearCart } = useCart();
  const [catalog, setCatalog] = useState<Product[]>([]);
  const [customer, setCustomer] = useState({ name: '', email: '', address: '' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => setCatalog(data?.data || []))
      .catch(() => setCatalog([]));
  }, []);

  const cartItems = useMemo(
    () =>
      items
        .map((item) => {
          const product = catalog.find((entry) => entry.id === item.id);
          if (!product) return null;
          return { ...product, quantity: item.quantity };
        })
        .filter(Boolean) as Array<Product & { quantity: number }>,
    [items, catalog],
  );

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  async function handleCheckout() {
    if (!cartItems.length) return;

    setSubmitting(true);

    const payload = {
      userId: 'demo-user',
      total: totalPrice,
      status: 'pending',
      items: cartItems.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
        unitPrice: item.price,
      })),
      customer,
    };

    const response = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    setSubmitting(false);

    if (result.success) {
      clearCart();
      window.location.href = '/products';
      return;
    }

    alert(result.message || 'Checkout failed');
  }

  if (!cartItems.length) {
    return (
      <main className="page-shell">
        <div className="panel empty-cart">
          <h1>Your cart is empty</h1>
          <Link href="/products" className="primary-button">Shop collection</Link>
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
              <button onClick={() => updateQuantity(item.id, -1)}>-</button>
              <strong>{item.quantity}</strong>
              <button onClick={() => updateQuantity(item.id, 1)}>+</button>
            </div>
            <strong>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(item.price * item.quantity)}</strong>
            <button className="ghost-button" onClick={() => removeFromCart(item.id)}>Remove</button>
          </div>
        ))}
      </section>

      <aside className="panel checkout-panel">
        <h2>Checkout</h2>
        <label>
          Name
          <input value={customer.name} onChange={(e) => setCustomer({ ...customer, name: e.target.value })} />
        </label>
        <label>
          Email
          <input type="email" value={customer.email} onChange={(e) => setCustomer({ ...customer, email: e.target.value })} />
        </label>
        <label>
          Address
          <textarea value={customer.address} onChange={(e) => setCustomer({ ...customer, address: e.target.value })} rows={4} />
        </label>

        <div className="checkout-total">
          <span>Total</span>
          <strong>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalPrice)}</strong>
        </div>

        <button className="primary-button" onClick={handleCheckout} disabled={submitting}>
          {submitting ? 'Processing...' : 'Place order'}
        </button>
      </aside>
    </main>
  );
}
