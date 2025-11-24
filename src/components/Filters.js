// src/components/Filters.js
import { deriveOptions } from "../lib/filtering";

export default function Filters({ products, value, onChange }) {
    const opts = deriveOptions(products);

    const handleField = (key) => (e) =>
        onChange({ ...value, [key]: e.target.value || undefined });

    const reset = () => onChange({});

    const selectedSubs = Array.isArray(value?.subcategories)
        ? value.subcategories
        : value?.subcategory
            ? [value.subcategory]
            : [];

    const toggleSubcat = (slug) => {
        const set = new Set(selectedSubs);
        set.has(slug) ? set.delete(slug) : set.add(slug);
        onChange({
            ...value,
            subcategories: Array.from(set),
            subcategory: undefined, // in case of legacy single value
        });
    };

    return (
        <div className="filters">
            <input
                className="ctrl"
                placeholder="Buscar..."
                value={value?.q || ""}
                onChange={handleField("q")}
            />

            {/* Brand selector */}
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

            {/* Category selector */}
            <select
                className="ctrl"
                value={value?.category || ""}
                onChange={handleField("category")}
            >
                <option value="">Categoría</option>
                {opts.categories.map((c) => (
                    <option key={c} value={c}>
                        {c}
                    </option>
                ))}
            </select>

            {/* Subcategory checkboxes */}
            <div className="filter-group">
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
            </div>

            <div className="filters__actions">
                <button className="btn btn--ghost" onClick={reset}>
                    Limpiar filtros
                </button>
            </div>
        </div>
    );
}
