/* import { useState } from "react";
import "./NavBar.css";


export default function NavBar() {
    const [lang, setLang] = useState("es");

    return (
        <header className="s-header">
            <div className="s-header__logo">
                <a href="#hero" className="logo-wrapper">
                    <img src="/images/logo.svg" alt="Homepage" className="logo-completo" />
                    <img src="/images/apple-touch-icon.png" alt="Isotipo" className="logo-isotipo" />
                </a>
            </div>

            <div className="s-header__content">
                <nav className="s-header__nav-wrap" aria-label="Principal">
                    <ul className="s-header__nav">
                        <li><a className="smoothscroll" href="#about" title="Nosotros">Nosotros</a></li>
                        <li><a className="smoothscroll" href="#portfolio" title="Soluciones">Soluciones</a></li>
                        <li><a className="smoothscroll" href="#services" title="Calibración">Calibración</a></li>
                        <li><a className="smoothscroll" href="#services" title="Rental">Rental</a></li>
                        <li><a className="smoothscroll" href="#portfolio" title="Cotizar">Cotizar</a></li>
                    </ul>
                </nav>
            </div>

            <button className="s-header__menu-toggle" type="button" aria-label="Abrir menú">
                <span>Menu</span>
            </button>
        </header>
    );
}
 */

import { useEffect, useState } from "react";
import "./NavBar.css";

export default function NavBar() {
    const [lang, setLang] = useState("es");
    const [menuOpen, setMenuOpen] = useState(false);

    // Cerrar al resize a desktop
    useEffect(() => {
        const onResize = () => {
            if (window.innerWidth >= 768) setMenuOpen(false);
        };
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    const toggleMenu = () => setMenuOpen((v) => !v);
    const closeMenu = () => setMenuOpen(false);

    return (
        <header className="s-header">
            <div className="s-header__logo">
                <a href="#hero" className="logo-wrapper" onClick={closeMenu}>
                    <img src="/images/logo.svg" alt="Homepage" className="logo-completo" />
                    <img src="/images/apple-touch-icon.png" alt="Isotipo" className="logo-isotipo" />
                </a>
            </div>

            {/* Agrego id y clase condicional is-open */}
            <div
                id="primary-nav"
                className={`s-header__content ${menuOpen ? "is-open" : ""}`}
            >
                <nav className="s-header__nav-wrap" aria-label="Principal">
                    <ul className="s-header__nav">
                        <li><a className="smoothscroll" href="#about" title="Nosotros" onClick={closeMenu}>Nosotros</a></li>
                        <li><a className="smoothscroll" href="#portfolio" title="Soluciones" onClick={closeMenu}>Soluciones</a></li>
                        <li><a className="smoothscroll" href="#services" title="Calibración" onClick={closeMenu}>Calibración</a></li>
                        <li><a className="smoothscroll" href="#services" title="Rental" onClick={closeMenu}>Rental</a></li>
                        <li><a className="smoothscroll" href="#portfolio" title="Cotizar" onClick={closeMenu}>Cotizar</a></li>
                    </ul>
                </nav>
            </div>

            {/* Botón con clases/ARIA según estado */}
            <button
                className={`s-header__menu-toggle ${menuOpen ? "is-clicked" : ""}`}
                type="button"
                aria-label="Abrir menú"
                aria-controls="primary-nav"
                aria-expanded={menuOpen}
                onClick={toggleMenu}
            >
                {/* el CSS dibuja las tres líneas con ::before/::after */}
                <span aria-hidden="true"></span>
            </button>
        </header>
    );
}
