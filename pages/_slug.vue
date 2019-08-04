<template>
  <section class="content">
    <h1>{{ project.title }}</h1>
    <h3>For</h3>
    <h3>{{ project.for }}</h3>
    <p>{{ project.description }}</p>
    <block-content :blocks="project.content" :serializers="serializers" />
  </section>
</template>

<script>
import VideoEmbed from '~/components/VideoEmbed'
import Showcase from '~/components/Showcase'

export default {
  // eslint-disable-next-line
  components: { VideoEmbed, Showcase },
  data() {
    return {
      serializers: {
        types: {
          videoEmbed: VideoEmbed,
          showcase: Showcase,
        },
      },
    }
  },
  asyncData({ route, $sanity }) {
    // Note the [0] at the end of the query to return the first element of the array
    const query = `*[ _type == "project" && slug.current == "${route.params.slug}" ][0]{
      ...,
      content[]{
        ...,
        _type == "showcase" => {
          "url": content.asset->url
        }
      }
    }`
    console.log(query)
    return $sanity.fetch(query).then(data => {
      console.log(data)
      return { project: data }
    })
  },
}
</script>
