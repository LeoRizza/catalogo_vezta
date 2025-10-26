// Este módulo se encarga de inicializar la app de Firebase y exportar
// una instancia de Firestore. Se leen las variables de entorno
// prefijadas con `REACT_APP_` para evitar exponer credenciales en el
// código fuente. Consulta el archivo README.md para saber cómo
// configurar estas variables en un archivo `.env`.

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// Inicializa Firebase solo si aún no está inicializado. En entornos
// como React con hot reload, `initializeApp` puede intentar ejecutar
// varias veces; sin embargo, `initializeApp` detecta múltiples
// inicializaciones y devuelve la instancia existente.
const app = initializeApp(firebaseConfig);

// Exporta la base de datos Firestore para usarla en los hooks.
export const db = getFirestore(app);