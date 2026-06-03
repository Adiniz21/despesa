import { initializeApp } from 'firebase/app';
import { getDataConnect, connectDataConnectEmulator } from 'firebase/data-connect';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { connectorConfig } from './dataconnect-generated';

// Configuração puxando as variáveis de ambiente do Vite (.env)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

export const app = initializeApp(firebaseConfig);
export const dataConnect = getDataConnect(app, connectorConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Conecta ao emulador automaticamente apenas quando estiver rodando no ambiente de desenvolvimento (npm run dev)
if (import.meta.env.DEV) {
  connectDataConnectEmulator(dataConnect, '127.0.0.1', 9399);
}