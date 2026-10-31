import { AdminSidebar } from '@/components/AdminSidebar';

export default function AdminPage() {
  return (
    <main className="page-shell admin-layout">
      <AdminSidebar />
      <section className="panel admin-card">
        <h1>Dashboard</h1>
        <p>Overview of products, orders, and activity</p>
      </section>
    </main>
  );
}
