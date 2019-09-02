<template>
  <footer>
    <h2>Macguire Rintoul</h2>
    <p>Experience designer & developer</p>
    <label for="subscribe-input">Subscribe for occasional emails</label>
    <input id="subscribe-input" type="email" />
    <button>Subscribe</button>
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
