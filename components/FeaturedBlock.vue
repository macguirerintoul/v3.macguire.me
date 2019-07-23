<template>
  <div class="featured-block">
    <h4 class="featured-block--name">{{ blockName }}</h4>
    <nuxt-link :to="seeAll" class="featured-block--see-all">
      <small>See all</small>
    </nuxt-link>

    <a :href="url" target="_blank" class="featured-block--item-title">
      <h5>{{ itemTitle }}</h5>
    </a>
    <small class="featured-block--context">
      {{ computeContext(contextOne) }}
    </small>

    <p>{{ text }}</p>
    <small class="featured-block--context">
      {{ computeContext(contextTwo) }}
    </small>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  props: {
    blockName: { type: String, default: '' },
    itemTitle: { type: String, default: '' },
    text: { type: String, default: '' },
    url: { type: String, default: '' },
    seeAll: { type: String, default: '' },
    contextOne: {
      type: Object,
      default() {
        return { type: '', value: '' }
      },
    },
    contextTwo: {
      type: Object,
      default() {
        return { type: '', value: '' }
      },
    },
  },
  methods: {
    computeContext(context) {
      if (context.type === 'starCount') {
        return `⭐️${context.value}`
      } else if (context.type === 'timestamp') {
        return moment(context.value).fromNow()
      } else {
        return context.value
      }
    },
  },
}
</script>
