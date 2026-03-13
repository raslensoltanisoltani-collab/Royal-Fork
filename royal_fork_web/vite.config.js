import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Royal-Fork/',
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'firebase-vendor': ['firebase/app', 'firebase/auth', 'firebase/firestore'],
          'stripe-vendor': ['@stripe/stripe-js', '@stripe/react-stripe-js'],
          'paypal-vendor': ['@paypal/react-paypal-js'],
          'motion-vendor': ['framer-motion'],
          'i18n-vendor': ['react-i18next', 'i18next'],
        }
      }
    }
  }
})
