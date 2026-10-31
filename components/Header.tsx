'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

type CartItem = {
  id: string;
  quantity: number;
};

type ProductCatalog = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
};

type CartContextValue = {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addToCart: (productId: string, quantity?: number) => void;
  updateQuantity: (productId: string, delta: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);
const STORAGE_KEY = 'ali-sr-cart';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [catalog, setCatalog] = useState<ProductCatalog[]>([]);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch {
        setItems([]);
      }
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        setCatalog(data?.data || []);
      })
      .catch(() => setCatalog([]));
  }, []);

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

  const clearCart = () => setItems([]);

  const totalItems = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  );

  const totalPrice = useMemo(
    () =>
      items.reduce((sum, item) => {
        const product = catalog.find((entry) => entry.id === item.id);
        return sum + (product ? product.price * item.quantity : 0);
      }, 0),
    [items, catalog],
  );

  const value = useMemo<CartContextValue>(
    () => ({ items, totalItems, totalPrice, addToCart, updateQuantity, removeFromCart, clearCart }),
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
      <strong>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalPrice)}</strong>
    </div>
  );
}
