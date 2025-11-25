/* import ProductCard from "./ProductCard";

export default function ProductGrid({ products }) {
  if (!products.length) return <div className="empty">No se encontraron productos.</div>;
  return (
    <div className="grid">
      {products.map(p => <ProductCard key={p.id} p={p} />)}
    </div>
  );
}
 */

// src/components/ProductGrid.js
import ProductCard from "./ProductCard";

export default function ProductGrid({ products, onSelectProduct }) {
  if (!products?.length) {
    return <p className="empty">No se encontraron productos.</p>;
  }

  return (
    <div className="grid">
      {products.map((p) => (
        <ProductCard
          key={p.id || p.sku || p.name} // usá la key que ya tenías
          product={p}
          onSelect={() => onSelectProduct && onSelectProduct(p)} // ⬅️ importante
        />
      ))}
    </div>
  );
}
