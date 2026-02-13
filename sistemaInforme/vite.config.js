import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        react(),
    ],
    server: {
        port: 51734, // Configuración del puerto del servidor de desarrollo
    },
    build: {
        outDir: 'dist', // Directorio de salida para el build
    },
});
