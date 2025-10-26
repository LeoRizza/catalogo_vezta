import React from 'react';
import ProductCard from './ProductCard';

/**
 * Renderiza una lista de productos. Admite paginación
 * mostrando un botón "Cargar más" cuando hay más resultados.
 *
 * @param {Array} products Lista de productos con id y otros campos
 * @param {Function} loadMore Función para cargar la siguiente página
 * @param {boolean} hasMore Indica si hay más productos por cargar
 * @param {boolean} loading Estado de carga actual
 */
function ProductList({ products, loadMore, hasMore, loading }) {
  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
      {loading && <p>Cargando...</p>}
      {!loading && products.length === 0 && <p>No se encontraron productos.</p>}
      {hasMore && !loading && (
        <button onClick={loadMore}>Cargar más</button>
      )}
    </div>
  );
}

export default ProductList;