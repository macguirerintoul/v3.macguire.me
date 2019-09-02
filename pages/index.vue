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
}
</script>
