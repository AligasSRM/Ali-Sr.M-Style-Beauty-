import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function AdminOrdersPage() {
  const user = getCurrentUser();
  if (!user || user.role !== 'ADMIN') {
    redirect('/login');
  }

  const orders = await prisma.order.findMany({
    include: { items: true },
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
        <h1>Orders</h1>
        <div className="admin-list">
          {orders.map((order) => (
            <div key={order.id} className="admin-item">
              <div>
                <strong>Order #{order.id.slice(0, 8)}</strong>
                <span>{order.status}</span>
              </div>
              <div>
                <span>{order.items.length} item(s)</span>
                <span>{order.total}$</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
