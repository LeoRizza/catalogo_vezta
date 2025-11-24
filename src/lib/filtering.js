// filtering.js
export function filterProducts(products, f) {
  const q = f?.q?.trim().toLowerCase();

  return (products || []).filter((p) => {
    // búsqueda de texto libre
    const byQ =
      !q ||
      [p.name, p.brand, p.category, p.subcategory, ...(p.tags || [])]
        .some((v) => v?.toString().toLowerCase().includes(q));

    // filtrar por marca (igual que antes)
    const byBrand = !f?.brand || p.brand === f.brand;

    // nuevo: filtrar por array de categorías
    const byCat =
      !f?.categories || f.categories.length === 0 ||
      f.categories.includes(p.category);

    // nuevo: filtrar por array de subcategorías
    const bySub =
      !f?.subcategories || f.subcategories.length === 0 ||
      f.subcategories.includes(p.subcategory);

    return byQ && byBrand && byCat && bySub;
  });
}

export function deriveOptions(products) {
  const uniq = (arr) =>
    Array.from(new Set((arr || []).filter(Boolean))).sort((a, b) =>
      a.localeCompare(b)
    );

  return {
    brands: uniq((products || []).map((p) => p.brand)),
    // si en el futuro quisieras usar "origen" puedes dejarlo,
    // pero no hace falta para el filtro actual.
    categories: uniq((products || []).map((p) => p.category)),
    subcategories: uniq((products || []).map((p) => p.subcategory)),
  };
}
