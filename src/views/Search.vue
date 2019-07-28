<template>
  <div class="search-results">
    <div v-if="searchJokes.length > 0">
      <joke-item v-for="joke in searchJokes" :key="joke.id" :joke="joke"></joke-item>
    </div>
    <div v-else-if="loading" class="nothing-found-message">Loading...</div>
    <div v-else-if="!loading && error" class="nothing-found-message">{{error}}</div>
    <div v-else-if="!loading && searchJokes.length === 0" class="nothing-found-message">Nothing found</div>
  </div>
</template>
<script>
import JokeItem from "@/components/JokeItem.vue";

export default {
  name: "search",
  props: {
    query: String
  },
  data() {
    return {
      query: ""
    };
  },
  methods: {
    fetchJokes() {
      this.$store.dispatch("fetchJokesByQuery", this.$route.params.query);
    }
  },
  mounted() {
    this.fetchJokes()
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
    error() {
      return this.$store.getters.error;
    },
    searchJokes() {
      return this.$store.getters.searchJokes;
    }
    // paginate (pageNumber) {
    //   const array = this.searchJokes
    //   const pageSize = 100
    //   --pageNumber
    //   return array.slice(pageNumber * pageSize, (pageNumber + 1) * pageSize);
    // }
  },
  watch: {
    '$route' (to, from) {
      this.fetchJokes()
    }
  },
  components: {
    JokeItem
  }
};
</script>
<style lang="scss">
.search-results {
  padding: 20px 10px;
}

.nothing-found-message {
  text-align: center;
  font-size: 20px;
}
</style>


