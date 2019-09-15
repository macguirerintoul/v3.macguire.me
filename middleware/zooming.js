/*
  This middleware is run every time the route is changed.
  Then, using Nuxt's onNuxtReady callback, it initializes
  an instance of Zooming and enables it on all images
  with the class 'img-zooming'.
 */
import Zooming from 'zooming'

export default function(context) {
  window.onNuxtReady(app => {
    const zooming = new Zooming()
    zooming.listen('.img-zooming')
  })
}
