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
          <Link href="/admin">Admin</Link>
          <Link href="/login">Login</Link>
        </nav>

        <Link href="/cart" className="cart-pill">
          Cart ({totalItems})
        </Link>
      </div>
    </header>
  );
}
