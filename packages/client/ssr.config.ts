import { defineConfig, PluginOption } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'
import svgr from '@svgr/rollup'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@components': path.resolve(__dirname, './src/components'),
    },
  },
  plugins: [react(), svgr() as PluginOption],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'ssr.tsx'),
      name: 'Client',
      formats: ['cjs'],
    },
    rollupOptions: {
      output: {
        dir: 'ssr-dist',
      },
    },
  },
})
