import React, { useState, useEffect } from 'react';

/**
 * Panel de filtros que permite seleccionar marca, categoría y
 * subcategoría. Cada vez que cambia un filtro se ejecuta
 * `onChange` con un nuevo objeto de filtros.
 *
 * @param {Array} brands Lista de marcas (id, name)
 * @param {Array} categories Lista de categorías (slug, name, children)
 * @param {Object} filters Filtros actuales
 * @param {Function} onChange Callback para actualizar filtros
 */
function FilterPanel({ brands, categories, filters, onChange }) {
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');

  // Cuando cambian los selectores, actualizar los filtros
  useEffect(() => {
    const newFilters = {};
    if (selectedBrand) {
      newFilters.brands = [selectedBrand];
    }
    if (selectedCategory) {
      newFilters.category = selectedCategory;
    }
    if (selectedSubcategory) {
      newFilters.subcategory = selectedSubcategory;
    }
    onChange(newFilters);
  }, [selectedBrand, selectedCategory, selectedSubcategory, onChange]);

  // Subcategorías de la categoría seleccionada
  const currentCategory = categories.find((cat) => cat.slug === selectedCategory);
  const subcategories = currentCategory?.children ?? [];

  return (
    <div className="filter-panel">
      <label>
        Marca:
        <select
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
        >
          <option value="">Todas</option>
          {brands.map((brand) => (
            <option key={brand.id} value={brand.id}>
              {brand.name}
            </option>
          ))}
        </select>
      </label>

      <label>
        Categoría:
        <select
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            // Al cambiar la categoría, reiniciar subcategoría
            setSelectedSubcategory('');
          }}
        >
          <option value="">Todas</option>
          {categories.map((category) => (
            <option key={category.slug} value={category.slug}>
              {category.name}
            </option>
          ))}
        </select>
      </label>

      {subcategories.length > 0 && (
        <label>
          Subcategoría:
          <select
            value={selectedSubcategory}
            onChange={(e) => setSelectedSubcategory(e.target.value)}
          >
            <option value="">Todas</option>
            {subcategories.map((sub) => (
              <option key={sub} value={sub}>
                {sub}
              </option>
            ))}
          </select>
        </label>
      )}
    </div>
  );
}

export default FilterPanel;