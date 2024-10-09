import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import checker from 'vite-plugin-checker';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react(),
      checker({ typescript: false }), // Disable TypeScript checking

    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    // Vite config
    define: {
      'process.env': env
    },
    // Server options
    server: {
      port: 3000, // you can change this
    },
    // Build options
    build: {
      outDir: 'dist',
    },
  };
});