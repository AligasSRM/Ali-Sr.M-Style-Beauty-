'use client';

export function ProductForm() {
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const payload = {
      name: String(form.get('name') || ''),
      category: String(form.get('category') || ''),
      price: Number(form.get('price') || 0),
      description: String(form.get('description') || ''),
      badge: String(form.get('badge') || 'New'),
      stock: Number(form.get('stock') || 0),
      image: String(form.get('image') || 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80'),
      slug: String(form.get('slug') || String(form.get('name') || '').toLowerCase().replace(/\s+/g, '-')),
    };

    const response = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    if (result.success) {
      alert('Product created successfully');
      window.location.reload();
    } else {
      alert(result.message || 'Failed to create product');
    }
  }

  return (
    <form className="panel product-form" onSubmit={handleSubmit}>
      <h3>Create product</h3>
      <label>
        Name
        <input type="text" name="name" required />
      </label>
      <label>
        Slug
        <input type="text" name="slug" />
      </label>
      <label>
        Category
        <input type="text" name="category" required />
      </label>
      <label>
        Price
        <input type="number" name="price" step="0.01" required />
      </label>
      <label>
        Stock
        <input type="number" name="stock" required />
      </label>
      <label>
        Badge
        <input type="text" name="badge" placeholder="New / Best Seller" />
      </label>
      <label>
        Image URL
        <input type="text" name="image" />
      </label>
      <label>
        Description
        <textarea name="description" rows={4} />
      </label>
      <button type="submit" className="primary-button">Save product</button>
    </form>
  );
}
