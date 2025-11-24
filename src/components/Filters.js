import { deriveOptions } from "../lib/filtering";

export default function Filters({ products, value, onChange }) {
    const opts = deriveOptions(products);

    // Normaliza valor de categorías a array
    const selectedCats = Array.isArray(value?.categories)
        ? value.categories
        : value?.category
            ? [value.category]
            : [];

    // Normaliza valor de subcategorías a array
    const selectedSubs = Array.isArray(value?.subcategories)
        ? value.subcategories
        : value?.subcategory
            ? [value.subcategory]
            : [];

    // Handler genérico para campos simples (p. ej. texto libre y marca)
    const handleField = (k) => (e) =>
        onChange({ ...value, [k]: e.target.value || undefined });

    // Cambiar selección de una categoría
    const toggleCat = (slug) => {
        const set = new Set(selectedCats);
        set.has(slug) ? set.delete(slug) : set.add(slug);
        onChange({
            ...value,
            categories: Array.from(set),
            category: undefined, // desactiva el campo simple antiguo
        });
    };

    // Cambiar selección de una subcategoría
    const toggleSubcat = (slug) => {
        const set = new Set(selectedSubs);
        set.has(slug) ? set.delete(slug) : set.add(slug);
        onChange({
            ...value,
            subcategories: Array.from(set),
            subcategory: undefined,
        });
    };

    const reset = () => onChange({});

    return (
        <div className="filters">
            {/* Buscar */}
            <input
                className="ctrl"
                placeholder="Buscar..."
                value={value?.q || ""}
                onChange={handleField("q")}
            />


            {/* Categorías – checklist */}
            <div className="filter-group">
                <div className="group-title">Categorías</div>
                <div className="subcat-list">
                    {opts.categories.map((c) => {
                        const checked = selectedCats.includes(c);
                        return (
                            <label key={c} className={`pill ${checked ? "is-active" : ""}`}>
                                <input
                                    type="checkbox"
                                    checked={checked}
                                    onChange={() => toggleCat(c)}
                                    style={{ marginRight: 8 }}
                                />
                                {c}
                            </label>
                        );
                    })}
                </div>
            </div>

            {/* Subcategorías – checklist */}
            {/*  <div className="filter-group">
                <div className="group-title">Subcategorías</div>
                <div className="subcat-list">
                    {opts.subcategories.map((s) => {
                        const checked = selectedSubs.includes(s);
                        return (
                            <label key={s} className={`pill ${checked ? "is-active" : ""}`}>
                                <input
                                    type="checkbox"
                                    checked={checked}
                                    onChange={() => toggleSubcat(s)}
                                    style={{ marginRight: 8 }}
                                />
                                {s}
                            </label>
                        );
                    })}
                </div>
            </div> */}


            {/* Marca */}
            <select
                className="ctrl"
                value={value?.brand || ""}
                onChange={handleField("brand")}
            >
                <option value="">Marca</option>
                {opts.brands.map((b) => (
                    <option key={b} value={b}>
                        {b}
                    </option>
                ))}
            </select>

            <div className="filters__actions">
                <button className="btn btn--ghost" onClick={reset}>
                    Limpiar filtros
                </button>
            </div>
        </div>
    );
}
