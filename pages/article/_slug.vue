<template>
  <article>
    <h1>{{ article.title }}</h1>
    <block-content :blocks="article.content" />
  </article>
</template>

<script>
export default {
  asyncData({ route, $sanity }) {
    // Note the [0] at the end of the query to return the first element of the array
    const query = `*[ _type == "article" && slug.current == '${route.params.slug}'][0]`
    console.log(query)
    return $sanity.fetch(query).then(data => {
      console.log(data)
      return { article: data }
    })
  },
}
</script>
