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

function QuoteForm({ product, onClose }) {
    const [form, setForm] = useState({
        nombre: "",
        empresa: "",
        email: "",
        telefono: "",
        mensaje: "",
    });

    const [sending, setSending] = useState(false);
    const [status, setStatus] = useState(null); // "ok" | "error" | null

    const productId =
        product?.id || product?.code || product?.sku || product?.name || "unknown";

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSending(true);
        setStatus(null);

        const payload = {
            ...form,
            productId,
            productName: product?.name,
            productBrand: product?.brand,
            productCategory: product?.category,
            productSubcategory: product?.subcategory,
            // podés sumar más campos si querés
        };

        try {
            const response = await fetch(
                "https://hook.us2.make.com/8m65w7rnn87qxmt1q5gxmc6jdlhkteaw",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                }
            );

            if (!response.ok) throw new Error("Server response not ok");

            setStatus("ok");
            setForm({
                nombre: "",
                empresa: "",
                email: "",
                telefono: "",
                mensaje: "",
            });
        } catch (err) {
            console.error(err);
            setStatus("error");
        } finally {
            setSending(false);
        }
    };

    return (
        <div className="quoteForm">
            {/* <div className="quoteForm__head">
                <h3 className="quoteForm__title">Solicitar cotización</h3>
                {onClose && (
                    <button type="button" className="quoteForm__close" onClick={onClose}>
                        ✕
                    </button>
                )}
            </div> */}

            <form id="contactForm" className="formularioContacto" onSubmit={handleSubmit}>
                <div className="inputDiv2">
                    <div style={{ margin: 0 }} className="inputDiv">
                        <label htmlFor="nombre">Tu Nombre</label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            required
                            className="inputTexto"
                            value={form.nombre}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="inputDiv">
                        <label htmlFor="empresa">Nombre de tu empresa</label>
                        <input
                            type="text"
                            id="empresa"
                            name="empresa"
                            required
                            className="inputTexto"
                            value={form.empresa}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="inputDiv2">
                    <div style={{ margin: 0 }} className="inputDiv">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            className="inputCorreo"
                            value={form.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div style={{ margin: 0 }} className="inputDiv">
                        <label htmlFor="telefono">Teléfono</label>
                        <input
                            type="tel"
                            id="telefono"
                            name="telefono"
                            className="inputTelefono"
                            value={form.telefono}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div style={{ margin: 0 }}>
                    <label htmlFor="mensaje">Tu mensaje</label>
                    <textarea
                        id="mensaje"
                        name="mensaje"
                        required
                        className="inputMensaje"
                        value={form.mensaje}
                        onChange={handleChange}
                        placeholder={`Consulta por: ${product?.name || ""}`}
                    />
                </div>

                {/* Esto te deja visible qué producto se está enviando */}
                <input type="hidden" name="productId" value={productId} />

                <button type="submit" className="botonEnviar" disabled={sending}>
                    {sending ? "Enviando..." : "Enviar"}
                </button>

                {status === "ok" && (
                    <p className="quoteForm__ok">
                        ¡Gracias! En breve será contactado por un asesor comercial.
                    </p>
                )}

                {status === "error" && (
                    <p className="quoteForm__error">
                        Ocurrió un error al enviar. Por favor, probá de nuevo.
                    </p>
                )}
            </form>
        </div>
    );
}


export default function ProductModal({ product, onClose, permanent = false }) {
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
    const [showQuote, setShowQuote] = useState(false);
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

    return permanent ? (
        // ✅ MODO PÁGINA 
        <div className="modal modal--permanent">
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

                    {/* Controles de carrusel */}
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
                                        "modal__thumbnail-btn" + (i === safeIndex ? " is-active" : "")
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

{/*                     {description && <p className="modal__meta modal__description">{description}</p>}

                    <button
                        type="button"
                        className="CotiDetalleBtn"
                        onClick={() => setShowQuote((v) => !v)}
                    >
                        Solicitar Cotización
                    </button> */}

                    {showQuote && (
                        <QuoteForm
                            product={product}
                            onClose={() => setShowQuote(false)}
                        />
                    )}


                    {showQuote && (
                        <QuoteForm
                            product={product}
                            onClose={() => setShowQuote(false)}
                        />
                    )}


                    {showQuote && (
                        <QuoteForm
                            product={product}
                            onClose={() => setShowQuote(false)}
                        />
                    )}


                    {(longDescription || description) && (
                        <>
                            <h3 className="modal__section-title">Descripción</h3>
                            <div className="section-line"></div>
                            <p className="modal__description">{longDescription || description}</p>
                        </>
                    )}

                    {specs && (
                        <>
                            <h3 className="modal__section-title">Especificaciones</h3>
                            <div className="section-line"></div>
                            <pre className="modal__specs">
                                {typeof specs === "string" ? specs : JSON.stringify(specs, null, 2)}
                            </pre>
                        </>
                    )}
                </div>
            </div>

            {/* MODAL INTERNO PARA VIDEO (sigue funcionando igual) */}
            {showVideo && embedUrl && (
                <div className="modal__video-overlay" onClick={() => setShowVideo(false)}>
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
    ) : (
        // ✅ MODO MODAL (tu comportamiento actual)
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
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

                        {imgs.length > 1 && (
                            <div className="modal__thumbnails">
                                {imgs.map((src, i) => (
                                    <button
                                        key={i}
                                        type="button"
                                        className={
                                            "modal__thumbnail-btn" + (i === safeIndex ? " is-active" : "")
                                        }
                                        onClick={() => setActiveIndex(i)}
                                    >
                                        <img src={src} alt={`${name} miniatura ${i + 1}`} />
                                    </button>
                                ))}
                            </div>
                        )}

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

                        {description && <p className="modal__meta modal__description">{description}</p>}

                        <button
                            type="button"
                            className="CotiDetalleBtn"
                            onClick={() => setShowQuote(v => !v)}
                            aria-expanded={showQuote}
                        >
                            {showQuote ? "Formulario de contacto" : "Solicitar Cotización"}
                        </button>

                        {showQuote && (
                            <div className="quoteFormWrap" onClick={(e) => e.stopPropagation()}>
                                <QuoteForm
                                    product={product}
                                    onClose={() => setShowQuote(false)}
                                />
                            </div>
                        )}


                        {(longDescription || description) && (
                            <>
                                <h3 className="modal__section-title">Descripción</h3>
                                <div className="section-line"></div>
                                <p className="modal__description">{longDescription || description}</p>
                            </>
                        )}

                        {specs && (
                            <>
                                <h3 className="modal__section-title">Especificaciones</h3>
                                <div className="section-line"></div>
                                <pre className="modal__specs">
                                    {typeof specs === "string" ? specs : JSON.stringify(specs, null, 2)}
                                </pre>
                            </>
                        )}
                    </div>
                </div>

                {/* MODAL INTERNO PARA VIDEO */}
                {showVideo && embedUrl && (
                    <div className="modal__video-overlay" onClick={() => setShowVideo(false)}>
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
