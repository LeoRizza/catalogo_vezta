import { useEffect, useMemo, useState } from "react";
import { useProducts } from "./hooks/useProducts";
import { filterProducts } from "./lib/filtering";
import { readFiltersFromURL, writeFiltersToURL } from "./lib/urlState";
import Filters from "./components/Filters";
import ProductGrid from "./components/ProductGrid";
import NavBar from "./components/NavBar";
import ProductModal from "./components/ProductModal";
import LineaFinalCoral from "./components/LineaFinalCoral";




export default function App() {
  const { products, loading, error } = useProducts();
  const [filters, setFilters] = useState(() => readFiltersFromURL());
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    writeFiltersToURL(filters);
  }, [filters]);

  const filtered = useMemo(
    () => filterProducts(products, filters),
    [products, filters]
  );

  if (loading) return <div className="container">Cargando…</div>;
  if (error) return <div className="container">Error cargando productos</div>;

  return (
    <>
      <NavBar />
      <div className="banner_header">
        <img
          src="/images/banner_catalogo.jpg"
          alt="Banner principal"
          className="banner__img"
        />
      </div>

      <div className="catalog-layout">
        <aside className="catalog-sidebar">
          <Filters products={products} value={filters} onChange={setFilters} />
        </aside>

        <main className="catalog-content">
          <h1 className="title">Catálogo</h1>
          <ProductGrid
            products={filtered}
            onSelectProduct={setSelectedProduct} // ⬅️ pasamos callback
          />
        </main>
      </div>

      {/* Modal de detalle */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
      <LineaFinalCoral />
    </>
  );
}

