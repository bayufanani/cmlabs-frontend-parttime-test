import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  ssr: false,
  css: ['./app/assets/style.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  app: {
    baseURL: '/cmlabs-frontend-parttime-test/'
  },
  nitro: {
    preset: 'github-pages' // Optimizes build for GitHub Pages
  }
})
