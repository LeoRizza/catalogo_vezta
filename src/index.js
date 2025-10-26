import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Punto de entrada de la aplicación. Se utiliza React 18 para crear
// el árbol de componentes y renderizarlo en el elemento raíz. La
// configuración del router se gestiona en `App.js`.
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);