<template>
  <div class="search-results">
    <div v-if="!loading">
      <div v-if="searchJokes.length > 0">
        <joke-item 
          v-for="joke in searchJokes" 
          :key="joke.id" 
          :joke="joke" 
        />
      </div>
      <div v-else-if="!loading && error" class="search-message">{{error}}</div>
      <div
        v-else-if="!loading && searchJokes.length === 0"
        class="search-message"
      >
        Nothing found
      </div>
    </div>
    <div v-if="loading">Loading...</div>
  </div>
</template>
<script>
import { mapGetters } from "vuex"
import JokeItem from "@/components/JokeItem.vue"

export default {
  name: "Search",
  props: {
    query: String,
    default: ""
  },
  methods: {
    fetchJokes() {
      this.$store.dispatch('fetchJokesByQuery', this.$route.params.query)
    }
  },
  mounted() {
    this.fetchJokes()
  },
  computed: {
    ...mapGetters(['loading', 'error', 'searchJokes'])
  },
  watch: {
    $route() {
      this.fetchJokes()
    }
  },
  components: {
    JokeItem
  }
}
</script>
<style lang="scss">
.search-results {
  padding: 20px 10px;
}

.search-message {
  text-align: center;
  font-size: 20px;
}
</style>


