export default function ProductCard({ p }) {
  const img = p.images?.[0];
  return (
    <div className="card">
      <div className="card__image">
        {img ? <img src={img} alt={p.name} /> : <span className="card__placeholder">Sin imagen</span>}
      </div>
      <div className="card__name">{p.name}</div>
      <div className="card__meta">{p.brand || "—"} • {p.origin || "—"}</div>
      <div className="card__meta card__meta--light">
        {p.category || "—"} {p.subcategory ? `› ${p.subcategory}` : ""}
      </div>
      {/* {"price" in p && p.price != null && (
        <div className="card__price">${Number(p.price).toLocaleString("es-AR")}</div>
      )} */}
    </div>
  );
}
