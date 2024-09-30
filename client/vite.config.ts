import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import vercel from "vite-plugin-vercel"; // Optional for Vercel-specific configs

export default defineConfig({
  plugins: [
    react(),
    vercel(), // If you're using vite-plugin-vercel
  ],
  server: {
    port: process.env.PORT ? parseInt(process.env.PORT) : 3000, // Define port from env
  },
  build: {
    outDir: "dist", // Vercel will use this output directory
  },
});
