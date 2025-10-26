import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

/**
 * Página de detalle para un producto específico. Consulta un
 * documento de la colección `products` en Firestore usando el
 * parámetro de la URL como ID. Si el producto no existe, muestra
 * un mensaje de error.
 */
function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(undefined); // undefined = cargando, null = no encontrado

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const ref = doc(db, 'products', id);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setProduct({ id: snap.id, ...snap.data() });
        } else {
          setProduct(null);
        }
      } catch (err) {
        console.error(err);
        setProduct(null);
      }
    };
    fetchProduct();
  }, [id]);

  if (product === undefined) {
    return <p>Cargando...</p>;
  }

  if (product === null) {
    return (
      <div className="product-detail">
        <Link to="/">← Volver al catálogo</Link>
        <p>Producto no encontrado.</p>
      </div>
    );
  }

  return (
    <div className="product-detail">
      <Link to="/">← Volver al catálogo</Link>
      <h2>{product.name}</h2>
      {product.images && product.images.map((img, idx) => (
        <img key={idx} src={img} alt={`${product.name} ${idx + 1}`} />
      ))}
      <p><strong>Marca:</strong> {product.brandName}</p>
      <p><strong>Categoría:</strong> {product.category}</p>
      <p><strong>Subcategoría:</strong> {product.subcategory}</p>
      {product.description && <p>{product.description}</p>}
    </div>
  );
}

export default ProductDetail;