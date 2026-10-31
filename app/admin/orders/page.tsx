import { AdminSidebar } from '@/components/AdminSidebar';

export default function AdminOrdersPage() {
  return (
    <main className="page-shell admin-layout">
      <AdminSidebar />
      <section className="panel admin-card">
        <h1>Orders</h1>
      </section>
    </main>
  );
}
