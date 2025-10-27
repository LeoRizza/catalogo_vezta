import ProductCard from "./ProductCard";
export default function ProductGrid({ products }) {
  if (!products.length) return <div style={{padding:"16px 0"}}>No se encontraron productos.</div>;
  return (
    <div style={{display:"grid", gap:"12px", gridTemplateColumns:"repeat(auto-fill, minmax(220px, 1fr))"}}>
      {products.map(p => <ProductCard key={p.id} p={p} />)}
    </div>
  );
}
