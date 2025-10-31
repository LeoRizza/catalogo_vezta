import { deriveOptions } from "../lib/filtering";

export default function Filters({ products, value, onChange }) {
    const opts = deriveOptions(products);

    const handleField =
        (k) =>
            (e) =>
                onChange({ ...value, [k]: e.target.value || undefined });

    const reset = () => onChange({});

    // Normalizo para soportar (viejo) value.subcategory string o (nuevo) array
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
            // por las dudas, apagamos el viejo campo single
            subcategory: undefined,
        });
    };

    return (
        <div className="filters">
            {/* Buscar */}
            <input
                className="ctrl"
                placeholder="Buscar..."
                value={value?.q || ""}
                onChange={handleField("q")}
            />

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

            {/* Origen */}
            <select
                className="ctrl"
                value={value?.origin || ""}
                onChange={handleField("origin")}
            >
                <option value="">Origen</option>
                {opts.origins.map((o) => (
                    <option key={o} value={o}>
                        {o}
                    </option>
                ))}
            </select>

            {/* Subcategorías SIEMPRE visibles (checkboxes) */}
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
