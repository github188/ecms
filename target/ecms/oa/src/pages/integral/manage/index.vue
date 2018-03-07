<template>
  <DetailsView v-if="details" />
  <ListView v-else />
</template>
<script>
import ListView from './list'
import DetailsView from './details'
export default {
  name: 'integral',
  components: {
    ListView,
    DetailsView
  },
  data() {
    return {
      details: false
    }
  },
  created() {
    this.details = this.$route.query.details
  },
  beforeRouteUpdate(to, from, next) {
    this.details = false
    next()
  }
}
</script>

