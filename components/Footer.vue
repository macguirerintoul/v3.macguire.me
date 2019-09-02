<template>
  <footer>
    <h2>Macguire Rintoul</h2>
    <FeaturedBlock type="randomStar" />
    <FeaturedBlock type="lastCommit" />
    <FeaturedBlock type="pick" />
  </footer>
</template>

<script>
import FeaturedBlock from '~/components/FeaturedBlock'

export default {
  components: {
    FeaturedBlock,
  },
}
</script>
