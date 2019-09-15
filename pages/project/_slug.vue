<template>
  <div class="content">
    <ProjectOverview :project="project" />
    <block-content :blocks="project.content" :serializers="serializers" />
  </div>
</template>

<script>
import VideoEmbed from '~/components/VideoEmbed'
import Showcase from '~/components/Showcase'
import CloudinaryImage from '~/components/CloudinaryImage'
import Blockquote from '~/components/Blockquote'
import ProjectOverview from '~/components/ProjectOverview'

export default {
  // eslint-disable-next-line
  components: { CloudinaryImage, VideoEmbed, Showcase, ProjectOverview },
  data() {
    return {
      project: {},
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
    return $sanity.fetch(query).then(data => {
      return { project: data }
    })
  },
}
</script>
