import Link from 'next/link';

export function AdminSidebar() {
  return (
    <aside className="admin-sidebar panel">
      <h3>Admin</h3>
      <nav>
        <Link href="/admin">Overview</Link>
        <Link href="/admin/products">Products</Link>
        <Link href="/admin/orders">Orders</Link>
      </nav>
    </aside>
  );
}
