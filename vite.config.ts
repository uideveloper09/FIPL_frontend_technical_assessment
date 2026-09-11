import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  base: process.env.GITHUB_PAGES === 'true' ? '/FIPL_frontend_technical_assessment/' : '/',
  plugins: [react(), tailwindcss()],
})
