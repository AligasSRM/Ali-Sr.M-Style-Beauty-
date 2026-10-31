import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function AdminPage() {
  const user = getCurrentUser();
  if (!user || user.role !== 'ADMIN') {
    redirect('/login');
  }

  const products = await prisma.product.count();
  const orders = await prisma.order.count();

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
        <div className="stats-grid">
          <div className="stat-box">
            <span>Products</span>
            <strong>{products}</strong>
          </div>
          <div className="stat-box">
            <span>Orders</span>
            <strong>{orders}</strong>
          </div>
        </div>
      </section>
    </main>
  );
}
