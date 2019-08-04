<template>
  <nuxt-link
    :class="['project-block', project.slug.current]"
    :to="project.slug.current"
  >
    <!-- <img :src="project.image.asset.url + '?h=500'" :alt="project.image.alt" /> -->
    <div class="project-block--content">
      <small>{{ project.for }}</small>
      <h3 class="project-block--title">{{ project.title }}</h3>
      <p>{{ project.shortDescription }}</p>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    project: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
}
</script>
