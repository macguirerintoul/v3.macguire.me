<template>
  <DataTable :records="picks" :columns="['title', 'description', 'date']">
    <!-- eslint-disable-next-line -->
    <template v-slot:record="record">
      <tr>
        <td>
          <a :href="record.url" target="_blank" noreferrer>
            {{ record.title }}
          </a>
        </td>
        <td>{{ record.description }}</td>
        <td>{{ record.date | fromNow }}</td>
      </tr>
    </template>
  </DataTable>
</template>
<script>
import moment from 'moment'

import DataTable from '~/components/DataTable.vue'

export default {
  components: {
    DataTable,
  },
  filters: {
    fromNow: function(str) {
      // Display the pick's date relative to now
      return moment(str).fromNow()
    },
  },
  asyncData({ route, $sanity }) {
    return $sanity.fetch(`*[_type == "pick"]`).then(data => {
      let picks = []
      console.log(data)
      data.forEach(data => {
        picks.push({
          title: data.title,
          description: data.description,
          url: data.url,
          date: data._updatedAt,
        })
      })
      console.log(picks)
      return { picks: picks }
    })
  },
}
</script>
