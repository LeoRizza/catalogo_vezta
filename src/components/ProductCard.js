// src/components/ProductCard.js
export default function ProductCard({ product, onSelect }) {
  const {
    name,
    brand,
    origin,
    category,
    subcategory,
    images,
    // price, // lo seguís teniendo pero NO lo mostrás
  } = product;

  const mainImage =
    (images && images[0]) || product.image || product.imageUrl || null;

  return (
    <article
      className="card"
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect && onSelect();
        }
      }}
    >
      <div className="card__image">
        {mainImage ? (
          <img src={mainImage} alt={name} />
        ) : (
          <div className="card__placeholder">Sin imagen</div>
        )}
      </div>

      <h2 className="card__name">{name}</h2>
      <div className="card__meta">
        {brand && <span><strong>Marca:</strong> {brand}</span>}
        {origin && <span> · {origin}</span>}
      </div>
      <div className="card__meta card__meta--light">
        {category && <span>{category}</span>}
        {subcategory && <span> · {subcategory}</span>}
      </div>

      {/* Precio oculto pero disponible para el futuro */}
      {/*
      <div className="card__price">
        {price && <>${price}</>}
      </div>
      */}
    </article>
  );
}
