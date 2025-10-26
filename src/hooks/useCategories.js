import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

/**
 * Hook para obtener la lista de categorías de la colección `categories`.
 * Cada documento debe incluir al menos `name`, `slug` y un array
 * `children` con las subcategorías (puede ser vacío si no hay
 * subcategorías).
 */
export function useCategories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const snap = await getDocs(collection(db, 'categories'));
      const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setCategories(list);
    };
    fetchCategories();
  }, []);
  return categories;
}

export default useCategories;