# Catálogo React Firebase

Este repositorio contiene una implementación mínima de un catálogo de productos
interactivo usando **React** y **Firebase** (Firestore) como base de datos.
El objetivo es ofrecer un listado de productos filtrable por marca,
categoría y subcategoría, así como una página de detalle para cada
producto. **No** incluye carrito de compras, autenticación ni gestión de
cuentas: se trata únicamente de un catálogo con filtros y una vista de
detalle.

## Estructura de carpetas

```
catalogo-react/
├── package.json          # dependencias y scripts de npm
├── README.md             # este documento
└── src/
    ├── App.js            # rutas de la aplicación
    ├── index.js          # punto de entrada principal
    ├── index.css         # estilos básicos
    ├── firebase.js       # inicialización de Firebase/Firestore
    ├── hooks/
    │   ├── useProducts.js    # hook para consultar productos con filtros
    │   ├── useBrands.js      # hook para consultar marcas
    │   └── useCategories.js  # hook para consultar categorías
    ├── components/
    │   ├── FilterPanel.js    # panel de filtros (marca/categoría/subcategoría)
    │   ├── ProductList.js    # lista de productos con paginación
    │   └── ProductCard.js    # tarjeta individual de producto
    └── pages/
        ├── Home.js           # página principal con filtros y listado
        └── ProductDetail.js  # detalle de un producto
```

## Configuración rápida

1. Asegúrate de tener instalado Node.js (recomendado ≥ 14.0).
2. Clona este repositorio y accede al directorio `catalogo-react`.
3. Instala las dependencias:

   ```bash
   npm install
   ```

4. Crea un archivo `.env` en la raíz del proyecto con tus credenciales
   de Firebase. Por ejemplo:

   ```env
   REACT_APP_FIREBASE_API_KEY=XXXX
   REACT_APP_FIREBASE_AUTH_DOMAIN=XXXX.firebaseapp.com
   REACT_APP_FIREBASE_PROJECT_ID=XXXX
   REACT_APP_FIREBASE_STORAGE_BUCKET=XXXX.appspot.com
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=XXXXXXXXXX
   REACT_APP_FIREBASE_APP_ID=1:XXXXXXXXXX:web:XXXXXXXXXX
   ```

   Estas variables se utilizan en `src/firebase.js` para inicializar
   Firebase sin exponer directamente las claves en el código.

5. Inicia la aplicación de desarrollo:

   ```bash
   npm start
   ```

   Esto abrirá una ventana en `http://localhost:3000` con el catálogo.

## Poblado de datos

Para que el catálogo sea funcional, necesitas tener cargadas las
colecciones `products`, `brands` y `categories` en tu
base de datos **Cloud Firestore**. Los documentos de `products` deben
incluir al menos los campos:

- `name`: nombre del producto
- `brandId`: identificador de la marca (referencia a un documento de `brands`)
- `brandName`: nombre de la marca
- `category`: nombre (o slug) de la categoría principal
- `subcategory`: nombre de la subcategoría
- `enabled`: `true` para productos visibles
- `updatedAt`: timestamp para ordenar resultados

Puedes encontrar un ejemplo de script de siembra en el hilo de conversación
previo de este proyecto para crear unos productos de ejemplo usando
`firebase-admin` o la SDK web.

## Índices

Al combinar filtros (`where`) y ordenamiento (`orderBy`) en Firestore,
es posible que necesites crear índices compuestos. La consola de
Firebase te mostrará un enlace para crear cada índice la primera vez
que se ejecute una consulta que lo requiera.

## Personalización

Este proyecto usa estilos básicos definidos en `index.css`. Si deseas
personalizar la apariencia, puedes modificar los estilos existentes o
integrar un framework como Tailwind CSS.

## Licencia

Este código se proporciona sin una licencia específica. Si reutilizas o
distribuyes este código, atribuye adecuadamente al autor original.