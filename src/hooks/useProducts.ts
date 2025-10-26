import { useEffect, useMemo, useState } from "react";
import { Product } from "../types";

export function useProducts() {
  const [data, setData] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetch("/products.json", { cache: "no-store" })
      .then(r => r.json())
      .then((json: Product[]) => { if (mounted) setData(json); })
      .catch(err => { if (mounted) setError(err); })
      .finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, []);

  const products = useMemo(() => data ?? [], [data]);
  return { products, loading, error };
}
