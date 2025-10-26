import { useEffect, useMemo, useState } from "react";
import { useProducts } from "./hooks/useProducts";
import { filterProducts, Filters } from "./lib/filtering";
import { readFiltersFromURL, writeFiltersToURL } from "./lib/urlState";
import FiltersView from "./components/Filters";
import ProductGrid from "./components/ProductGrid";

export default function App() {
  const { products, loading, error } = useProducts();
  const [filters, setFilters] = useState<Filters>(() => readFiltersFromURL());
  useEffect(() => { writeFiltersToURL(filters); }, [filters]);
  const filtered = useMemo(() => filterProducts(products, filters), [products, filters]);
  if (loading) return <div>Cargando…</div>;
  if (error) return <div>Error cargando productos</div>;
  return (
    <div style={{maxWidth:1200, margin:"0 auto", padding:"16px"}}>
      <h1>Catálogo</h1>
      <FiltersView products={products} value={filters} onChange={setFilters} />
      <ProductGrid products={filtered} />
    </div>
  );
}
