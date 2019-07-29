<template>
  <nuxt-link :to="project.slug.current">
    <div class="project-block">
      <h2 class="project-block--title">{{ project.title }}</h2>
      <p>{{ project.description }}</p>
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
