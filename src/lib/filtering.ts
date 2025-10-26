import { Product } from "../types";

export type Filters = {
  q?: string;
  brand?: string;
  origin?: string;
  category?: string;
  subcategory?: string;
};

export function filterProducts(products: Product[], f: Filters) {
  const q = f.q?.trim().toLowerCase();
  return products.filter(p => {
    const byQ = !q || [
      p.name, p.brand, p.origin, p.category, p.subcategory, ...(p.tags ?? [])
    ].some(v => v?.toString().toLowerCase().includes(q));
    const byBrand = !f.brand || p.brand === f.brand;
    const byOrigin = !f.origin || p.origin === f.origin;
    const byCat = !f.category || p.category === f.category;
    const bySub = !f.subcategory || p.subcategory === f.subcategory;
    return byQ && byBrand && byOrigin && byCat && bySub;
  });
}

export function deriveOptions(products: Product[]) {
  const uniq = (arr: (string|undefined)[]) =>
    Array.from(new Set(arr.filter(Boolean) as string[])).sort((a,b)=>a.localeCompare(b));
  return {
    brands: uniq(products.map(p => p.brand)),
    origins: uniq(products.map(p => p.origin)),
    categories: uniq(products.map(p => p.category)),
    subcategories: uniq(products.map(p => p.subcategory)),
  };
}
