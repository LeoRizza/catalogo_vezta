import { Routes, Route } from "react-router-dom";
import HomeCatalog from "./pages/HomeCatalog";
import ProductPage from "./pages/ProductPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeCatalog />} />
      <Route path="/producto/:id" element={<ProductPage />} />
    </Routes>
  );
}
