'use client';

import { useEffect, useState } from 'react';
import { AdminSidebar } from '@/components/AdminSidebar';

type Product = {
  id: string;
  name: string;
  slug: string;
  category: string;
  price: number;
  rating: number;
  image: string;
  description: string;
  badge: string;
  stock: number;
};

const emptyForm = {
  name: '',
  slug: '',
  category: 'Fashion',
  price: 0,
  rating: 0,
  image: '',
  description: '',
  badge: 'New',
  stock: 0,
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);

  async function loadProducts() {
    const response = await fetch('/api/products');
    const data = await response.json();
    setProducts(data?.data ?? []);
  }

  useEffect(() => {
    loadProducts();
  }, []);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const payload = {
      ...form,
      slug: form.slug || form.name.toLowerCase().replace(/\s+/g, '-'),
      price: Number(form.price),
      rating: Number(form.rating),
      stock: Number(form.stock),
    };

    const method = editingId ? 'PUT' : 'POST';
    const url = editingId ? `/api/products/${editingId}` : '/api/products';

    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    if (!response.ok) {
      alert(result.message || 'Unable to save product');
      return;
    }

    setForm(emptyForm);
    setEditingId(null);
    loadProducts();
  }

  async function handleEdit(product: Product) {
    setEditingId(product.id);
    setForm({
      name: product.name,
      slug: product.slug,
      category: product.category,
      price: product.price,
      rating: product.rating,
      image: product.image,
      description: product.description,
      badge: product.badge,
      stock: product.stock,
    });
  }

  async function handleDelete(id: string) {
    const response = await fetch(`/api/products/${id}`, { method: 'DELETE' });
    const result = await response.json();
    if (!response.ok) {
      alert(result.message || 'Unable to delete product');
      return;
    }

    loadProducts();
  }

  return (
    <main className="page-shell admin-layout">
      <AdminSidebar />

      <section className="panel admin-card">
        <h1>Manage products</h1>

        <form onSubmit={handleSubmit} className="admin-form">
          <div className="admin-grid">
            <label>
              Name
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            </label>
            <label>
              Slug
              <input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
            </label>
            <label>
              Category
              <input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required />
            </label>
            <label>
              Price
              <input type="number" step="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} required />
            </label>
            <label>
              Rating
              <input type="number" step="0.1" value={form.rating} onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })} />
            </label>
            <label>
              Stock
              <input type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })} required />
            </label>
            <label>
              Badge
              <input value={form.badge} onChange={(e) => setForm({ ...form, badge: e.target.value })} />
            </label>
            <label>
              Image URL
              <input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
            </label>
            <label className="full-width">
              Description
              <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={4} />
            </label>
          </div>

          <div className="admin-actions">
            <button type="submit" className="primary-button">
              {editingId ? 'Update product' : 'Create product'}
            </button>
            {editingId && (
              <button
                type="button"
                className="secondary-button"
                onClick={() => {
                  setEditingId(null);
                  setForm(emptyForm);
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        <div className="admin-list">
          {products.map((product) => (
            <div key={product.id} className="admin-item">
              <div>
                <strong>{product.name}</strong>
                <span>{product.category}</span>
              </div>
              <div>
                <span>{product.stock} in stock</span>
                <span>{product.price}$</span>
              </div>
              <div className="inline-actions">
                <button type="button" className="secondary-button small-button" onClick={() => handleEdit(product)}>
                  Edit
                </button>
                <button type="button" className="ghost-button small-button" onClick={() => handleDelete(product.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
