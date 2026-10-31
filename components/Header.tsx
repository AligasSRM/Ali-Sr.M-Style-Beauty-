'use client';

import Link from 'next/link';
import { useCart } from './CartProvider';

export function Header() {
  const { totalItems } = useCart();

  return (
    <header className="topbar">
      <div className="topbar-inner">
        <Link href="/" className="brand">
          ALI SR.M
        </Link>

        <nav className="nav-links">
          <Link href="/">Home</Link>
          <Link href="/products">Shop</Link>
          <Link href="/studio">AI Studio</Link>
          <Link href="/style">Style Center</Link>
        </nav>

        <Link href="/cart" className="cart-pill">
          Cart ({totalItems})
        </Link>
      </div>
    </header>
  );
}
