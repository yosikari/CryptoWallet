import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
 import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/CryptoWallet/',
  publicPath: process.env.NODE_ENV === "production" ? "/CryptoWallet/" : "/",
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
