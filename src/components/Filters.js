import { deriveOptions } from "../lib/filtering";

export default function Filters({ products, value, onChange }) {
  const opts = deriveOptions(products);
  const handle = (k) => (e) => onChange({ ...value, [k]: e.target.value || undefined });
  const reset = () => onChange({});

  return (
    <div className="filters">
      <input className="ctrl" placeholder="Buscar..." value={value?.q || ""} onChange={handle("q")} />
      <select className="ctrl" value={value?.brand || ""} onChange={handle("brand")}>
        <option value="">Marca</option>
        {opts.brands.map((b) => <option key={b} value={b}>{b}</option>)}
      </select>
      <select className="ctrl" value={value?.origin || ""} onChange={handle("origin")}>
        <option value="">Origen</option>
        {opts.origins.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
      <select className="ctrl" value={value?.category || ""} onChange={handle("category")}>
        <option value="">Categoría</option>
        {opts.categories.map((c) => <option key={c} value={c}>{c}</option>)}
      </select>
      <select className="ctrl" value={value?.subcategory || ""} onChange={handle("subcategory")}>
        <option value="">Subcategoría</option>
        {opts.subcategories.map((s) => <option key={s} value={s}>{s}</option>)}
      </select>

      <div className="filters__actions">
        <button className="btn btn--ghost" onClick={reset}>Limpiar filtros</button>
      </div>
    </div>
  );
}
