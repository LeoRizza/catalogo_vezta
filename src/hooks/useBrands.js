import { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';

/**
 * Hook para obtener la lista de marcas desde la colección `brands`.
 * Solo devuelve aquellas marcas cuyo campo `enabled` sea true
 * (si el campo existe), para evitar mostrar marcas deshabilitadas.
 */
export function useBrands() {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const fetchBrands = async () => {
      // Si existe un campo `enabled`, filtra las marcas activas.
      // En caso contrario, devuelve todas.
      const q = query(collection(db, 'brands'));
      const snap = await getDocs(q);
      const list = snap.docs
        .map((d) => ({ id: d.id, ...d.data() }))
        .filter((brand) => brand.enabled !== false);
      setBrands(list);
    };
    fetchBrands();
  }, []);
  return brands;
}

export default useBrands;