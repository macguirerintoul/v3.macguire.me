<template>
  <div>
    <FeaturedBlock block-name="Stars" v-bind="randomStar" />
    <FeaturedBlock block-name="Latest Commit" v-bind="latestCommit" />
    <FeaturedBlock block-name="Picks" v-bind="pick" />
  </div>
</template>

<script>
import FeaturedBlock from '~/components/FeaturedBlock.vue'

export default {
  components: {
    FeaturedBlock,
  },
  data() {
    return {
      randomStar: null,
      latestCommit: null,
      pick: null,
    }
  },
  mounted() {
    this.getRandomStar()
    this.getLatestCommit()
    this.getPick()
  },
  methods: {
    getRandomStar() {
      // Fetch repositories I have starred on GitHub
      fetch('https://api.github.com/users/mrintoul/starred')
        .then(response => response.json())
        .then(data => {
          const chosenStar = data[Math.floor(Math.random() * data.length)]
          this.randomStar = {
            itemTitle: chosenStar.full_name,
            contextOne: {
              type: 'starCount',
              value: chosenStar.stargazers_count.toString(),
            },
            text: chosenStar.description,
            url: chosenStar.html_url,
          }
        })
    },
    async getPick() {
      const query = '*[_type == "pick"]' // Sanity GROQ query
      const picks = await this.$sanity.fetch(query) // Retrieve all Picks
      // Choose a Pick at random from the array
      const pick = picks[Math.floor(Math.random() * picks.length)]
      // Store the Pick in state
      this.pick = {
        itemTitle: pick.title,
        text: pick.description,
        url: pick.url,
        contextOne: { type: 'timestamp', value: pick._createdAt },
      }
    },
    getLatestCommit() {
      fetch('https://api.github.com/users/mrintoul/events')
        .then(response => response.json())
        .then(data => {
          const pushEvents = data.filter(event => {
            return event.type === 'PushEvent'
          })
          const latestPush = pushEvents[0]
          const latestCommit = latestPush.payload.commits[0]
          this.latestCommit = {
            contextOne: { type: 'hash', value: latestCommit.sha.substr(0, 6) },
            contextTwo: { type: 'timestamp', value: latestPush.created_at },
            text: latestCommit.message,
            itemTitle: latestPush.repo.name,
            url: `https://github.com/${latestPush.repo.name}`,
            commitURL: `https://github.com/${latestPush.repo.name}/${latestCommit.sha}`,
          }
        })
    },
  },
}
</script>
