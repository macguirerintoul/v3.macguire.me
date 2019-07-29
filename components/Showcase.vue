<template>
  <div class="showcase">
    <div v-if="type === 'image'">
      <img :src="url" />
    </div>
    <div v-if="type === 'video'">
      <video autoplay muted loop :src="url" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    caption: {
      type: String,
      default: '',
    },
    orientation: {
      type: String,
      default: '',
    },
    url: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: '',
    },
  },
}
</script>
