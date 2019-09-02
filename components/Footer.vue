<template>
  <footer>
    <div class="footer-content">
      <h2>Macguire Rintoul</h2>
      <p>Experience designer & developer</p>
      <label for="subscribe-input">Subscribe for occasional emails</label>
      <input id="subscribe-input" type="email" />
      <button>Subscribe</button>
      <div class="featured-block-container">
        <FeaturedBlock type="randomStar" />
        <FeaturedBlock type="lastCommit" />
        <FeaturedBlock type="pick" />
      </div>
    </div>
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
