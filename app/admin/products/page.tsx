import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function AdminProductsPage() {
  const user = requireAdmin();
  if (!user) {
    redirect('/login');
  }

  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <main className="page-shell admin-layout">
      <aside className="panel admin-sidebar">
        <h3>Admin</h3>
        <nav>
          <a href="/admin">Overview</a>
          <a href="/admin/products">Products</a>
          <a href="/admin/orders">Orders</a>
        </nav>
      </aside>

      <section className="panel admin-card">
        <h1>Manage products</h1>
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
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
