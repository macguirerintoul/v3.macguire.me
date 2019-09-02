<template>
  <div>
    <style v-for="project in projects" :key="project._key">
      .project-block.{{project.slug.current}} {
        background: url(https://res.cloudinary.com/macguire/image/upload/c_scale,w_800,dpr_auto,f_auto,q_auto:eco/{{project.featuredImage}})
                    no-repeat
                    center center/cover;
      }
      .project-block.{{project.slug.current}}:before {
        background: url(https://res.cloudinary.com/macguire/image/upload/c_scale,w_800,dpr_auto,f_auto,q_auto:eco/{{project.featuredImage}})
                    no-repeat
                    center center/cover;
      }
    </style>
    <section class="hero">
      <block-content :blocks="content" :serializers="serializers" />
    </section>
    <section class="work animate-fade-in-up">
      <h1>Work</h1>
      <div class="project-flex-container">
        <ProjectBlock
          v-for="project in projects"
          :key="project._key"
          :project="project"
        />
      </div>
    </section>
    <FeaturedBlock block-name="Stars" v-bind="randomStar" />
    <FeaturedBlock block-name="Latest Commit" v-bind="latestCommit" />
    <FeaturedBlock block-name="Picks" v-bind="pick" />
  </div>
</template>

<script>
import FeaturedBlock from '~/components/FeaturedBlock.vue'
import ProjectBlock from '~/components/ProjectBlock.vue'

export default {
  components: {
    FeaturedBlock,
    ProjectBlock,
  },
  data() {
    return {
      randomStar: null,
      latestCommit: null,
      pick: null,
      serializers: {
        marks: {
          link: ({ mark, children }) => {
            const { blank, href } = mark
            return blank ? (
              <a class="hvr-float" href={href} target="_blank" rel="noopener">
                {children}
              </a>
            ) : (
              <a href={href}>{children}</a>
            )
          },
        },
      },
    }
  },
  async asyncData({ $sanity }) {
    let retrievedData = { projects: null, content: null }
    retrievedData.projects = await $sanity
      .fetch(
        `*[_type == "project"] | order(order) {
        title, shortDescription, for, slug, featuredImage
      }`
      )
      .then(data => {
        return data
      })
    retrievedData.content = await $sanity
      .fetch('*[_type == "index"][0]')
      .then(data => {
        return data.text
      })
    console.log(retrievedData)
    return retrievedData
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
