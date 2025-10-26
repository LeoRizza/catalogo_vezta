import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';

/**
 * Componente raíz de la aplicación. Define las rutas principales del
 * catálogo utilizando `react-router-dom`. La ruta base muestra el
 * listado de productos con filtros (`Home`) y la ruta con
 * `/product/:id` muestra el detalle de un producto específico.
 */
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </Router>
  );
}

export default App;