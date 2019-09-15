export default {
  mode: 'spa',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'initial-scale=1.0, width=device-width',
      },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['@/assets/style.scss'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/sanity-blocks-vue-component',
    '~/plugins/vue-vimeo-player',
    '~/plugins/vue-cloudinary',
  ],
  /*
   ** Middleware
   */
  router: {
    middleware: 'zooming',
  },
  /*
   ** Nuxt.js modules
   */
  modules: ['@nuxtjs/pwa', '@nuxtjs/eslint-module', 'nuxt-sanity'],
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
  },
  sanity: {
    projectId: 'hk4ya08c',
    dataset: 'production',
    useCdn: true,
  },
}
