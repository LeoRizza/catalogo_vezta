// src/components/ProductModal.js
import "./ProductModal.css";

export default function ProductModal({ product, onClose }) {
    if (!product) return null;

    const {
        name,
        description,
        brand,
        origin,
        category,
        subcategory,
        images,
        specs,
    } = product;

    const imgs =
        (Array.isArray(images) && images.length ? images : [product.image || product.imageUrl].filter(Boolean));

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div
                className="modal"
                onClick={(e) => e.stopPropagation()} // para que el click interno no cierre
            >
                <button className="modal__close" onClick={onClose} aria-label="Cerrar">
                    ✕
                </button>

                <div className="modal__body">
                    <div className="modal__images">
                        {imgs.length ? (
                            imgs.map((src, i) => (
                                <div key={i} className="modal__image-wrapper">
                                    <img src={src} alt={`${name} - imagen ${i + 1}`} />
                                </div>
                            ))
                        ) : (
                            <div className="card__placeholder">Sin imagen</div>
                        )}
                    </div>

                    <div className="modal__info">
                        <h2 className="modal__title">{name}</h2>

                        <p className="modal__meta">
                            {brand && <span><strong>Marca:</strong> {brand}</span>}
                            {origin && <span> · {origin}</span>}
                        </p>

                        <p className="modal__meta modal__meta--light">
                            {category && <span>{category}</span>}
                            {subcategory && <span> · {subcategory}</span>}
                        </p>

                        {description && (
                            <p className="modal__description">{description}</p>
                        )}

                        {specs && (
                            <pre className="modal__specs">
                                {typeof specs === "string"
                                    ? specs
                                    : JSON.stringify(specs, null, 2)}
                            </pre>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
