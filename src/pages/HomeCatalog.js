import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import { filterProducts } from "../lib/filtering";
import { readFiltersFromURL, writeFiltersToURL } from "../lib/urlState";
import Filters from "../components/Filters";
import ProductGrid from "../components/ProductGrid";
import NavBar from "../components/NavBar";
import ProductModal from "../components/ProductModal";
import LineaFinalCoral from "../components/LineaFinalCoral";

export default function HomeCatalog() {
    const { products, loading, error } = useProducts();
    const [filters, setFilters] = useState(() => readFiltersFromURL());

    const [searchParams, setSearchParams] = useSearchParams();
    const selectedId = searchParams.get("producto");

    const selectedProduct = selectedId
        ? products.find((p) => p.id === Number(selectedId))
        : null;

    useEffect(() => {
        writeFiltersToURL(filters);
    }, [filters]);

    const filtered = useMemo(
        () => filterProducts(products, filters),
        [products, filters]
    );

    const handleSelectProduct = (product) => {
        setSearchParams({ producto: product.id });
    };

    const handleCloseModal = () => {
        searchParams.delete("producto");
        setSearchParams(searchParams);
    };

    if (loading) return <div className="container">Cargando…</div>;
    if (error) return <div className="container">Error cargando productos</div>;

    return (
        <>
            <NavBar />

            <div className="banner_header">
                <img
                    src="/images/banner_catalogo.jpg"
                    alt="Banner principal"
                    className="banner__img"
                />
            </div>

            <div className="catalog-layout">
                <aside className="catalog-sidebar">
                    <Filters products={products} value={filters} onChange={setFilters} />
                </aside>

                <main className="catalog-content">
                    <h1 className="title">Catálogo</h1>
                    <ProductGrid
                        products={filtered}
                        onSelectProduct={handleSelectProduct}
                    />
                </main>
            </div>

            {/* Modal sincronizado con URL */}
            {selectedProduct && (
                <ProductModal
                    product={selectedProduct}
                    onClose={handleCloseModal}
                />
            )}

            <LineaFinalCoral />
        </>
    );
}
