'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import products, { formatPrice, getProductById } from '@/lib/products';

type CartItem = {
  id: string;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addToCart: (productId: string, quantity?: number) => void;
  updateQuantity: (productId: string, delta: number) => void;
  removeFromCart: (productId: string) => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const saved = window.localStorage.getItem('ali-sr-cart');
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch {
        setItems([]);
      }
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('ali-sr-cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (productId: string, quantity = 1) => {
    setItems((current) => {
      const existing = current.find((item) => item.id === productId);
      if (existing) {
        return current.map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity + quantity } : item,
        );
      }
      return [...current, { id: productId, quantity }];
    });
  };

  const updateQuantity = (productId: string, delta: number) => {
    setItems((current) =>
      current
        .map((item) =>
          item.id === productId ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const removeFromCart = (productId: string) => {
    setItems((current) => current.filter((item) => item.id !== productId));
  };

  const totalItems = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  );

  const totalPrice = useMemo(
    () =>
      items.reduce((sum, item) => {
        const product = getProductById(item.id);
        return sum + (product ? product.price * item.quantity : 0);
      }, 0),
    [items],
  );

  const value = useMemo<CartContextValue>(
    () => ({ items, totalItems, totalPrice, addToCart, updateQuantity, removeFromCart }),
    [items, totalItems, totalPrice],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}

export function AddToCartButton({ productId }: { productId: string }) {
  const { addToCart } = useCart();

  return (
    <button className="primary-button small-button" onClick={() => addToCart(productId)}>
      Add to cart
    </button>
  );
}

export function CartSummary() {
  const { totalItems, totalPrice } = useCart();

  return (
    <div className="summary-inline">
      <span>{totalItems} items</span>
      <strong>{formatPrice(totalPrice)}</strong>
    </div>
  );
}
