import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Tarjeta individual de producto. Muestra la imagen principal,
 * nombre, marca y subcategoría. Al hacer clic redirige al
 * detalle del producto.
 *
 * @param {Object} product Producto a mostrar
 */
function ProductCard({ product }) {
  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        {Array.isArray(product.images) && product.images.length > 0 && (
          <img src={product.images[0]} alt={product.name} />
        )}
        <h3>{product.name}</h3>
        {product.brandName && <p>{product.brandName}</p>}
        {product.subcategory && <p>{product.subcategory}</p>}
      </Link>
    </div>
  );
}

export default ProductCard;