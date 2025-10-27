import ProductCard from "./ProductCard";

export default function ProductGrid({ products }) {
  if (!products.length) return <div className="empty">No se encontraron productos.</div>;
  return (
    <div className="grid">
      {products.map(p => <ProductCard key={p.id} p={p} />)}
    </div>
  );
}
