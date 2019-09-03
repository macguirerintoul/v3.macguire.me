<template>
  <footer>
    <div class="footer-content">
      <h2>Macguire Rintoul</h2>
      <p>Experience designer & developer</p>
      <h3>Like email?</h3>
      <label class="footer-subscribe-label" for="subscribe-input">Email</label>
      <input
        id="subscribe-input"
        v-model="email"
        class="footer-subscribe-input"
        type="email"
        placeholder="Email"
      />
      <button @click="addSubsriber">Subscribe</button>
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
  data() {
    return {
      email: '',
    }
  },
  methods: {
    addSubsriber() {
      console.log('Attempting to add subscriber...')
      fetch('https://api.macguire.now.sh/api/add-subscriber', {
        method: 'post',
        body: `{email: ${this.email}}`,
      }).then(response => {
        console.log(response)
      })
    },
  },
}
</script>
