import { useEffect, useState } from "react";
import "./NavBar.css";

export default function NavBar() {
    const [lang, setLang] = useState("es");
    const [menuOpen, setMenuOpen] = useState(false);

    // Cierra el menú cuando la pantalla es grande (similar al resize del script)
    useEffect(() => {
        const onResize = () => {
            // arriba de 901px cerramos el menú
            if (window.innerWidth >= 901) {
                setMenuOpen(false);
            }
        };

        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    // Maneja la clase en el <body> (menu-is-open)
    useEffect(() => {
        if (menuOpen) {
            document.body.classList.add("menu-is-open");
        } else {
            document.body.classList.remove("menu-is-open");
        }

        // limpieza por las dudas
        return () => {
            document.body.classList.remove("menu-is-open");
        };
    }, [menuOpen]);

    const toggleMenu = (event) => {
        if (event) event.preventDefault();
        setMenuOpen((v) => !v);
    };

    const handleNavClick = () => {
        // solo cerramos el menú en mobile (<= 900px)
        if (window.matchMedia("(max-width: 900px)").matches) {
            setMenuOpen(false);
        }
    };

    return (
        <header className="s-header">
            <div className="s-header__logo">
                <a href="#hero" className="logo-wrapper">
                    <img
                        src="images/logo.svg"
                        alt="Homepage"
                        className="logo-completo"
                    />
                </a>
            </div>

            <div className="s-header__content">
                <nav className="s-header__nav-wrap">
                    <ul className="s-header__nav">
                        <li>
                            <a
                                className="smoothscroll"
                                href="#about"
                                title="About"
                                onClick={handleNavClick}
                            >
                                Nosotros
                            </a>
                        </li>
                        <li>
                            <a
                                className="smoothscroll"
                                href="#clients"
                                title="Catalogo"
                                onClick={handleNavClick}
                            >
                                Catálogo
                            </a>
                        </li>
                        <li>
                            <a
                                className="smoothscroll"
                                href="#industry"
                                title="Industrias"
                                onClick={handleNavClick}
                            >
                                Industrias
                            </a>
                        </li>
                        <li>
                            <a
                                className="smoothscroll"
                                href="#contact"
                                title="Contacto"
                                onClick={handleNavClick}
                            >
                                Contacto
                            </a>
                        </li>
                    </ul>
                </nav>

                <div className="radio-inputLoco">
                    <div className="divInputLoco">EN</div>
                    <div className="divInputLoco">/</div>
                    <div className="divInputLoco">ES</div>
                    <div className="divInputLoco">/</div>
                    <div className="divInputLoco">BR</div>
                </div>
            </div>

            {/* Botón hamburguesa */}
            <a
                className={`s-header__menu-toggle ${menuOpen ? "is-clicked" : ""
                    }`}
                href="#0"
                onClick={toggleMenu}
            >
                <span>Menu</span>
            </a>
        </header>
    );
}
