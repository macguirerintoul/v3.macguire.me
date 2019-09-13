<template>
  <section class="content">
    <h1>{{ project.title }}</h1>
    <ProjectContext
      :client="project.for"
      :roles="project.roles"
      :tools="project.tools"
    />
    <p>{{ project.description }}</p>
    <block-content :blocks="project.content" :serializers="serializers" />
  </section>
</template>

<script>
import VideoEmbed from '~/components/VideoEmbed'
import Showcase from '~/components/Showcase'
import CloudinaryImage from '~/components/CloudinaryImage'
import Blockquote from '~/components/Blockquote'
import ProjectContext from '~/components/ProjectContext'

export default {
  // eslint-disable-next-line
  components: { CloudinaryImage, VideoEmbed, Showcase, ProjectContext },
  data() {
    return {
      serializers: {
        types: {
          videoEmbed: VideoEmbed,
          showcase: Showcase,
          cloudinaryImage: CloudinaryImage,
          blockquote: Blockquote,
        },
      },
    }
  },
  asyncData({ route, $sanity }) {
    // Note the [0] at the end of the query to return the first element of the array
    const query = `*[ _type == "project" && slug.current == "${route.params.slug}" ][0]`
    // console.log(query)
    return $sanity.fetch(query).then(data => {
      // console.log(data)
      return { project: data }
    })
  },
}
</script>
