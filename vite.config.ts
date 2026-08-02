import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // Precisa ser o nome do repositório para o GitHub Pages resolver os assets.
  base: '/do-zero-ao-agente/',
  plugins: [react(), tailwindcss()],
})
