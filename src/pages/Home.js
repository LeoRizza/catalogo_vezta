import React, { useState } from 'react';
import { useProducts } from '../hooks/useProducts';
import { useBrands } from '../hooks/useBrands';
import { useCategories } from '../hooks/useCategories';
import FilterPanel from '../components/FilterPanel';
import ProductList from '../components/ProductList';

/**
 * Página principal del catálogo. Incluye el panel de filtros y la
 * lista de productos. Mantiene el estado de los filtros seleccionados
 * y los pasa al hook `useProducts`.
 */
function Home() {
  const [filters, setFilters] = useState({});
  const brands = useBrands();
  const categories = useCategories();
  const { products, loadMore, hasMore, loading } = useProducts(filters, 20);

  return (
    <div className="app-container">
      <FilterPanel
        brands={brands}
        categories={categories}
        filters={filters}
        onChange={setFilters}
      />
      <ProductList
        products={products}
        loadMore={loadMore}
        hasMore={hasMore}
        loading={loading}
      />
    </div>
  );
}

export default Home;