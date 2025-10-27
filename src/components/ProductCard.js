export default function ProductCard({ p }) {
  const img = p.images?.[0];
  return (
    <div style={{border:"1px solid #ddd", borderRadius:8, padding:12}}>
      <div style={{aspectRatio:"1/1", background:"#f5f5f5", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:8}}>
        {img ? <img src={img} alt={p.name} style={{maxWidth:"100%", maxHeight:"100%", objectFit:"contain"}}/> : <span style={{color:"#999"}}>Sin imagen</span>}
      </div>
      <div style={{fontWeight:600}}>{p.name}</div>
      <div style={{fontSize:12, color:"#555"}}>{p.brand || "—"} • {p.origin || "—"}</div>
      <div style={{fontSize:12, color:"#777"}}>{p.category || "—"} {p.subcategory ? `> ${p.subcategory}` : ""}</div>
      {"price" in p && p.price != null && (
        <div style={{marginTop:6, fontWeight:700}}>${p.price.toLocaleString("es-AR")}</div>
      )}
    </div>
  );
}
