// src/lib/filtering.js
export function filterProducts(products, filters) {
  const q = filters?.q?.trim().toLowerCase();

  return (products || []).filter((p) => {
    // free‑text search – match against name, brand, category, subcategory and any tags
    const byQ =
      !q ||
      [p.name, p.brand, p.category, p.subcategory, ...(p.tags || [])].some(
        (v) => v && v.toString().toLowerCase().includes(q)
      );

    const byBrand = !filters?.brand || p.brand === filters.brand;
    const byCategory = !filters?.category || p.category === filters.category;

    // allow multi‑select subcategories; filters.subcategories can be array or string
    const subFilter = filters?.subcategories;
    const bySubcat =
      !subFilter ||
      (Array.isArray(subFilter)
        ? subFilter.includes(p.subcategory)
        : p.subcategory === subFilter);

    return byQ && byBrand && byCategory && bySubcat;
  });
}

export function deriveOptions(products) {
  const uniq = (arr) =>
    Array.from(new Set((arr || []).filter(Boolean))).sort((a, b) =>
      a.localeCompare(b)
    );

  return {
    brands: uniq(products.map((p) => p.brand)),
    categories: uniq(products.map((p) => p.category)),
    subcategories: uniq(products.map((p) => p.subcategory)),
  };
}
