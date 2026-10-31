import ProductGrid from '@/components/ProductGrid';
import products from '@/lib/products';

export default function ProductsPage() {
  return (
    <main className="page-shell">
      <section className="section-block">
        <div className="section-header">
          <h1>Shop all</h1>
        </div>
        <ProductGrid items={products} />
      </section>
    </main>
  );
}
