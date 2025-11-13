import { useEffect, useMemo, useState } from "react";
import { useProducts } from "./hooks/useProducts";
import { filterProducts } from "./lib/filtering";
import { readFiltersFromURL, writeFiltersToURL } from "./lib/urlState";
import Filters from "./components/Filters";
import ProductGrid from "./components/ProductGrid";
import NavBar from "./components/NavBar";



export default function App() {
  const { products, loading, error } = useProducts();
  const [filters, setFilters] = useState(() => readFiltersFromURL());
  useEffect(() => { writeFiltersToURL(filters); }, [filters]);
  const filtered = useMemo(() => filterProducts(products, filters), [products, filters]);

  if (loading) return <div className="container">Cargando…</div>;
  if (error) return <div className="container">Error cargando productos</div>;

  return (
    <>
      <NavBar />
      <div className="banner_header2">
        <img src="/images/banner_catalogo.jpg" alt="Banner principal" className="banner__img" />
      </div>
      <div className="catalog-layout">
        <div className="contenedorCat">
          <aside className="catalog-sidebar">
            <Filters products={products} value={filters} onChange={setFilters} />
          </aside>
          <main className="catalog-content">
            <h1 className="title">Catálogo</h1>
            <ProductGrid products={filtered} />
          </main>
        </div>
      </div>
    </>
  );
}

