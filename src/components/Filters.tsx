import { Filters, deriveOptions } from "../lib/filtering";
import { Product } from "../types";

type Props = {
  products: Product[];
  value: Filters;
  onChange: (next: Filters) => void;
};

export default function Filters({ products, value, onChange }: Props) {
  const opts = deriveOptions(products);
  const handle = (k: keyof Filters) => (e: React.ChangeEvent<HTMLInputElement|HTMLSelectElement>) =>
    onChange({ ...value, [k]: e.target.value || undefined });
  const reset = () => onChange({});

  return (
    <div style={{display:"grid", gap:"8px", gridTemplateColumns:"1fr 1fr 1fr 1fr 1fr", marginBottom: "12px"}}>
      <input placeholder="Buscar..." value={value.q || ""} onChange={handle("q")} />
      <select value={value.brand || ""} onChange={handle("brand")}>
        <option value="">Marca</option>{opts.brands.map(b => <option key={b} value={b}>{b}</option>)}
      </select>
      <select value={value.origin || ""} onChange={handle("origin")}>
        <option value="">Origen</option>{opts.origins.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
      <select value={value.category || ""} onChange={handle("category")}>
        <option value="">Categoría</option>{opts.categories.map(c => <option key={c} value={c}>{c}</option>)}
      </select>
      <select value={value.subcategory || ""} onChange={handle("subcategory")}>
        <option value="">Subcategoría</option>{opts.subcategories.map(s => <option key={s} value={s}>{s}</option>)}
      </select>
      <div style={{gridColumn:"1 / -1", display:"flex", gap:"8px"}}>
        <button onClick={reset}>Limpiar filtros</button>
      </div>
    </div>
  );
}
