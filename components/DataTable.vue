<template>
  <table>
    <thead>
      <tr>
        <th
          v-for="column in columns"
          :key="column"
          :class="{ active: sortKey == column }"
          @click="sortBy(column)"
        >
          {{ column | capitalize }}
          <span class="arrow" :class="sortOrders[column] > 0 ? 'asc' : 'dsc'">
          </span>
        </th>
      </tr>
    </thead>
    <tbody>
      <!-- eslint-disable-next-line -->
      <slot v-for="record in records" name="record" :url="record.url" :title="record.title" :date="record._updatedAt" :description="record.description"></slot>
    </tbody>
  </table>
</template>

<script>
import moment from 'moment'

export default {
  filters: {
    capitalize: function(str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    },
  },
  props: {
    records: {
      // An array of records (i.e. the rows to be displayed in the table)
      type: Array,
      default: () => {
        return []
      },
    },
    columns: {
      /* An array describing the columns the table should have
       * Should be an array of objects with the 'title' key being the display name for the column,
       * and the 'sanityKey' key being the property to display from the Sanity API.
       * e.g.
       * columns: [
       * { title: 'Title', sanityKey: 'title' },
       * { title: 'Description', sanityKey: 'description' },
       * ]
       */
      type: Array,
      default: () => {
        return []
      },
    },
    filterKey: { type: String, default: '' },
  },
  data: function() {
    var sortOrders = {}
    this.columns.forEach(function(key) {
      sortOrders[key] = 1
    })
    return {
      sortKey: '',
      sortOrders: sortOrders,
    }
  },
  computed: {
    filteredrecords: function() {
      var sortKey = this.sortKey
      var filterKey = this.filterKey && this.filterKey.toLowerCase()
      var order = this.sortOrders[sortKey] || 1
      var records = this.records
      if (filterKey) {
        records = records.filter(function(row) {
          return Object.keys(row).some(function(key) {
            return (
              String(row[key])
                .toLowerCase()
                .indexOf(filterKey) > -1
            )
          })
        })
      }
      if (sortKey) {
        records = records.slice().sort(function(a, b) {
          a = a[sortKey]
          b = b[sortKey]
          return (a === b ? 0 : a > b ? 1 : -1) * order
        })
      }
      return records
    },
  },
  created() {
    // we register the item-template component here
    // without having to declare it in the components() section
    this.$options.components.recordTemplate = {
      props: ['record'],
      template: this.recordTemplateString,
    }
  },
  methods: {
    sortBy: function(key) {
      this.sortKey = key
      this.sortOrders[key] = this.sortOrders[key] * -1
    },
  },
}
</script>
