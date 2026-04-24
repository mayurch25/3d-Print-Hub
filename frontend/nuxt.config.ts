// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  components: true,
  runtimeConfig: {
    public: {
      // apiBase: 'http://localhost:5000' // local
      apiBase: 'http://threed-print-hub.onrender.com' 

    }
  }
})