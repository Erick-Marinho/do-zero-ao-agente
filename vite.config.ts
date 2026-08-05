import { copyFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/**
 * O GitHub Pages não sabe reescrever rotas para o index.html, então uma URL
 * como /modulo/fundacao devolveria 404 num acesso direto ou num refresh.
 * Servindo uma cópia do index como página de erro, o app carrega e o router
 * resolve a rota a partir da URL, que permanece intacta.
 */
function fallbackSpaGithubPages(): Plugin {
  let outDir = 'dist'
  return {
    name: 'fallback-spa-github-pages',
    apply: 'build',
    configResolved(config) {
      outDir = config.build.outDir
    },
    closeBundle() {
      copyFileSync(resolve(outDir, 'index.html'), resolve(outDir, '404.html'))
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  // Precisa ser o nome do repositório para o GitHub Pages resolver os assets.
  base: '/do-zero-ao-agente/',
  plugins: [react(), tailwindcss(), fallbackSpaGithubPages()],
})
