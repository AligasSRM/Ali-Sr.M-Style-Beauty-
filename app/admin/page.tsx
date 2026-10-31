import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function AdminPage() {
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
        <h1>Dashboard</h1>
        <p>Signed in as {user.name}</p>

        <div className="stats-grid">
          <div className="stat-box">
            <span>Products</span>
            <strong>{products.length}</strong>
          </div>
          <div className="stat-box">
            <span>Role</span>
            <strong>{user.role}</strong>
          </div>
        </div>
      </section>
    </main>
  );
}
