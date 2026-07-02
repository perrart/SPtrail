import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' faz os assets serem referenciados com caminho relativo,
// então o build funciona tanto na raiz de um domínio quanto num
// subcaminho de projeto do GitHub Pages (ex: usuario.github.io/repo/),
// sem precisar saber o nome do repositório de antemão.
export default defineConfig({
  plugins: [react()],
  base: './',
})
