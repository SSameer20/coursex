import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import vercel from 'vite-plugin-vercel';

 

// https://vitejs.dev/config/
export default defineConfig({
  // server: {
  //   port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
  // },
  plugins: [
    react(),
    // vercel(),
  ],
})
