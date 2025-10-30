import { useState } from "react";
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

                {/* <div className="radio-inputLoco" role="group" aria-label="Idioma">
                    <div className="divInputLoco">
                        <input
                            name="lang"
                            type="radio"
                            className="inputLoco"
                            value="es"
                            checked={lang === "es"}
                            onChange={() => setLang("es")}
                        />
                        <img className="langFlag" src="/images/icons/argentina-flag-circular-17805.svg" alt="Español" />
                    </div>
                    <div className="divInputLoco">
                        <input
                            name="lang"
                            type="radio"
                            className="inputLoco"
                            value="pt"
                            checked={lang === "pt"}
                            onChange={() => setLang("pt")}
                        />
                        <img className="langFlag" src="/images/icons/brazil-flag-circular-17847.svg" alt="Português" />
                    </div>
                    <div className="divInputLoco">
                        <input
                            name="lang"
                            type="radio"
                            className="inputLoco"
                            value="en"
                            checked={lang === "en"}
                            onChange={() => setLang("en")}
                        />
                        <img className="langFlag" src="/images/icons/usa-flag-circular-17882.svg" alt="English" />
                    </div>
                </div> */}
            </div>

            <button className="s-header__menu-toggle" type="button" aria-label="Abrir menú">
                <span>Menu</span>
            </button>
        </header>
    );
}
