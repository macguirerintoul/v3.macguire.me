<template>
  <DataTable :records="picks" :columns="['Title', 'Description', 'Date']">
    <!-- eslint-disable-next-line -->
    <template slot="record" scope="props">
      <tr>
        <td>
          <a :href="props.url" target="_blank" noreferrer>{{ props.title }}</a>
        </td>
        <td>{{ props.description }}</td>
        <td>{{ props.date }}</td>
      </tr>
    </template>
  </DataTable>
</template>
<script>
import DataTable from '~/components/DataTable.vue'

export default {
  components: {
    DataTable,
  },
  asyncData({ route, $sanity }) {
    return $sanity.fetch(`*[_type == "pick"]`).then(data => {
      console.log(data)
      return { picks: data }
    })
  },
}
</script>
