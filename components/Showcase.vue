<template>
  <div :class="['showcase', orientation]">
    <div v-if="type === 'image'">
      <CldImage dpr="auto" responsive width="auto" :public-id="cloudinaryID" />
    </div>
    <div v-if="type === 'video'">
      <CldVideo muted loop="true" autoplay="autoplay" :public-id="cloudinaryID">
        <CldTransformation quality="auto:eco" fetch-format="auto" />
      </CldVideo>
    </div>
    <div>
      {{ caption }}
    </div>
  </div>
</template>

<script>
import { CldImage, CldVideo, CldTransformation } from 'cloudinary-vue'

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
    cloudinaryID: {
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
