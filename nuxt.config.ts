export default defineNuxtConfig({
  modules: ['@nuxt/ui', '@nuxt/image'],
  
  // Verifica que la ruta sea exacta a tu carpeta actual
  css: ['~/styles/main.css'],

  // Nuxt UI v3 ya integra Tailwind v4, así que no necesitas 
  // configurar un archivo tailwind.config.js por separado a menos que sea necesario.
})