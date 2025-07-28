import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/PAT-Practice/', // 👈 Required for GitHub Pages!
  plugins: [react()],
})
