import { useParams } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import ProductModal from "../components/ProductModal"; // lo reutilizamos

export default function ProductPage() {
    const { id } = useParams();
    const { products, loading } = useProducts();

    if (loading) return <div>Cargando…</div>;

    const product = products.find((p) => p.id === Number(id));

    if (!product) return <div>Producto no encontrado</div>;

    return (
        <div style={{ padding: "40px 20px" }}>
            <ProductModal product={product} permanent />
        </div>
    );
}
