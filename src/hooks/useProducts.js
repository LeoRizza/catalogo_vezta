import { useEffect, useState, useCallback } from 'react';
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  getDocs,
} from 'firebase/firestore';
import { db } from '../firebase';

/**
 * Hook para obtener productos de Firestore con filtros y paginación.
 *
 * @param {Object} filters Un objeto con posibles filtros:
 *   - brands: array de IDs de marca (máx. 10 valores) para filtrar
 *   - category: slug o nombre de la categoría principal
 *   - subcategory: nombre de la subcategoría
 *   - searchTag: etiqueta opcional para búsqueda por tags
 *
 * @param {number} pageSize Cantidad de productos a cargar por página.
 * @returns {Object} { products, loadMore, hasMore, loading }
 */
export function useProducts(filters = {}, pageSize = 20) {
  const [products, setProducts] = useState([]);
  const [cursor, setCursor] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  // Construye la consulta según filtros. Se memoriza con useCallback
  // para no recrear la función en cada render.
  const buildQuery = useCallback(() => {
    const conditions = [where('enabled', '==', true)];

    // Filtrar por una o varias marcas
    if (filters.brands?.length === 1) {
      conditions.push(where('brandId', '==', filters.brands[0]));
    } else if (filters.brands && filters.brands.length > 1) {
      // array-contains-any acepta un máximo de 10 valores
      conditions.push(where('brandId', 'in', filters.brands.slice(0, 10)));
    }

    // Filtrar por subcategoría o por categoría
    if (filters.subcategory) {
      conditions.push(where('subcategory', '==', filters.subcategory));
    } else if (filters.category) {
      conditions.push(where('category', '==', filters.category));
    }

    // Filtrar por tag
    if (filters.searchTag) {
      conditions.push(where('tags', 'array-contains', filters.searchTag));
    }

    return query(
      collection(db, 'products'),
      ...conditions,
      orderBy('updatedAt', 'desc'),
      limit(pageSize)
    );
  }, [filters, pageSize]);

  // Carga de productos. Si `reset` es true, reinicia los productos
  // actuales y carga desde el principio. Si no, carga la siguiente
  // página a partir del cursor actual.
  const load = async (reset = false) => {
    if (loading) return;
    setLoading(true);
    let q = buildQuery();
    if (!reset && cursor) {
      q = query(q, startAfter(cursor));
    }
    const snap = await getDocs(q);
    const docs = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    setHasMore(snap.size === pageSize);
    setCursor(snap.docs[snap.docs.length - 1] || null);
    setProducts((prev) => (reset ? docs : [...prev, ...docs]));
    setLoading(false);
  };

  // Al cambiar los filtros se reinicia la paginación y se carga de nuevo
  useEffect(() => {
    setCursor(null);
    load(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buildQuery]);

  return { products, loadMore: () => load(false), hasMore, loading };
}

export default useProducts;