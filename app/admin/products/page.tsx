import { AdminSidebar } from '@/components/AdminSidebar';
import { ProductForm } from '@/components/ProductForm';

export default function AdminProductsPage() {
  return (
    <main className="page-shell admin-layout">
      <AdminSidebar />
      <section className="panel admin-card">
        <h1>Manage products</h1>
        <ProductForm />
      </section>
    </main>
  );
}
