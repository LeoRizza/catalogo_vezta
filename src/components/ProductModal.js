// src/components/ProductModal.js
import { useState, useMemo } from "react";
import "./ProductModal.css";

function getYouTubeEmbedUrl(videoUrl) {
    if (!videoUrl) return null;

    // [Inference] Asumo URLs tipo:
    // https://www.youtube.com/watch?v=ID  o  https://youtu.be/ID
    try {
        const url = new URL(videoUrl);

        // youtu.be/ID
        if (url.hostname.includes("youtu.be")) {
            return `https://www.youtube.com/embed/${url.pathname.replace("/", "")}`;
        }

        // youtube.com/watch?v=ID
        if (url.searchParams.get("v")) {
            const id = url.searchParams.get("v");
            return `https://www.youtube.com/embed/${id}`;
        }

        // si ya viene embed u otro formato, la devuelvo tal cual
        return videoUrl;
    } catch {
        return videoUrl;
    }
}

export default function ProductModal({ product, onClose }) {
    if (!product) return null;

    const {
        name,
        description,
        longDescription,
        brand,
        origin,
        category,
        subcategory,
        images,
        specs,
        price,
        videoUrl,
    } = product;

    const imgs =
        (Array.isArray(images) && images.length
            ? images
            : [product.image || product.imageUrl].filter(Boolean)) || [];

    const [activeIndex, setActiveIndex] = useState(0);
    const [showVideo, setShowVideo] = useState(false);

    const safeIndex =
        imgs.length === 0
            ? 0
            : Math.min(Math.max(activeIndex, 0), imgs.length - 1);

    const embedUrl = useMemo(
        () => (videoUrl ? getYouTubeEmbedUrl(videoUrl) : null),
        [videoUrl]
    );

    const handlePrev = () => {
        if (!imgs.length) return;
        setActiveIndex((prev) => (prev === 0 ? imgs.length - 1 : prev - 1));
    };

    const handleNext = () => {
        if (!imgs.length) return;
        setActiveIndex((prev) => (prev === imgs.length - 1 ? 0 : prev + 1));
    };

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
                    {/* COLUMNA IZQUIERDA: IMÁGENES + VIDEO */}
                    <div className="modal__images">
                        <div className="modal__image-main">
                            {imgs.length ? (
                                <img
                                    src={imgs[safeIndex]}
                                    alt={`${name} - imagen ${safeIndex + 1}`}
                                />
                            ) : (
                                <div className="card__placeholder">Sin imagen</div>
                            )}
                        </div>

                        {/* Controles de carrusel (se muestran en mobile por CSS) */}
                        {imgs.length > 1 && (
                            <div className="modal__carousel-controls">
                                <button onClick={handlePrev} aria-label="Imagen anterior">
                                    ‹
                                </button>
                                <span>
                                    {safeIndex + 1} / {imgs.length}
                                </span>
                                <button onClick={handleNext} aria-label="Imagen siguiente">
                                    ›
                                </button>
                            </div>
                        )}

                        {/* Miniaturas horizontales */}
                        {imgs.length > 1 && (
                            <div className="modal__thumbnails">
                                {imgs.map((src, i) => (
                                    <button
                                        key={i}
                                        type="button"
                                        className={
                                            "modal__thumbnail-btn" +
                                            (i === safeIndex ? " is-active" : "")
                                        }
                                        onClick={() => setActiveIndex(i)}
                                    >
                                        <img src={src} alt={`${name} miniatura ${i + 1}`} />
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Botón para ver video en modal interno */}
                        {embedUrl && (
                            <button
                                type="button"
                                className="modal__video-btn"
                                onClick={() => setShowVideo(true)}
                            >
                                ▶ Ver video
                            </button>
                        )}
                    </div>

                    {/* COLUMNA DERECHA: INFO */}
                    <div className="modal__info">
                        <h2 className="modal__title">{name}</h2>

                        <p className="modal__meta">
                            {brand && (
                                <span>
                                    <strong>Marca:</strong> {brand}
                                </span>
                            )}
                            {origin && <span> · {origin}</span>}
                        </p>

                        <p className="modal__meta modal__meta--light">
                            {category && <span>{category}</span>}
                            {subcategory && <span> · {subcategory}</span>}
                        </p>

                        <p className="modal__meta modal__description">
                            {description}<span>{description}</span>
                        </p>

                        {/* precio wewe */}

                        {/* {price && (
                            <p className="modal__price">
                                <strong>{price}</strong>
                            </p>
                        )} */}

                        <button className="CotiDetalleBtn">Solicitar Cotización</button>

                        {(longDescription || description) && (
                            <>
                                <h3 className="modal__section-title">Descripción</h3>
                                <div className="section-line"></div>
                                <p className="modal__description">
                                    {longDescription || description}
                                </p>
                            </>
                        )}

                        {specs && (
                            <>
                                <h3 className="modal__section-title">Especificaciones</h3>
                                <div className="section-line"></div>
                                <pre className="modal__specs">
                                    {typeof specs === "string"
                                        ? specs
                                        : JSON.stringify(specs, null, 2)}
                                </pre>
                            </>
                        )}
                    </div>
                </div>

                {/* MODAL INTERNO PARA VIDEO */}
                {showVideo && embedUrl && (
                    <div
                        className="modal__video-overlay"
                        onClick={() => setShowVideo(false)}
                    >
                        <div
                            className="modal__video-container"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                className="modal__video-close"
                                onClick={() => setShowVideo(false)}
                                aria-label="Cerrar video"
                            >
                                ✕
                            </button>
                            <div className="modal__video-responsive">
                                <iframe
                                    src={embedUrl}
                                    title={name}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
