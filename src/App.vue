<template>
  <div id="app" class="wrapper">
    <form class="search-wrapper" @submit.prevent="toSearch">
      <input
        type="text"
        class="search-box"
        placeholder="Search..."
        v-model="query"
      />
      <div class="search-buttons">
        <button class="search-btn btn">Search</button>
        <button class="clear-btn btn" @click.prevent="clearQuery">Clear</button>
      </div>
    </form>
    <router-view/>
  </div>
</template>
<script>
export default {
  data() {
    return {
      query: this.$route.params.query || ''
    };
  },
  methods: {
    toSearch() {
      const { query } = this
      if (query === '') return
      this.$router.push({ path: '/' + query })
    },
    clearQuery() {
      this.query = ''
    }
  },
  watch: {
    query(val) {
      if (val === '') this.$router.push({ path: '/' })
    }
  }
}
</script>
<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Roboto');

* {
    box-sizing: border-box;
}

html, body {
  height: 100%;
}

body {
  margin: 0;
}

.btn {
  text-decoration: none;
  color: #ffffff;
  border-radius: 1px;
  background-color: #2196f3;
  border: none;
  box-shadow: 0px 3px 3px 0px rgba(50, 50, 50, 0.1);
  display: inline-block;
  line-height: 35px;
  text-align: center;
  position: relative;
  transition: 0.3s ease;
  cursor: pointer;
}

.wrapper {
  max-width: 960px;
  margin: 0 auto;
  padding: 20px 10px;
  font-family: 'Roboto', sans-serif;
}

.search-wrapper {
  display: flex;
  width: 100%;
  margin: 0 auto 10px;
}

.search-box {
  width: 100%;
  font-size: 18px;
  padding: 15px 20px 15px 25px;
  appearance: none;
  border: none;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  border-radius: 4px;
}

.search-buttons {
  display: flex;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);

  .btn {
    width: 100px;
  }
}

@media screen and (max-width: 768px) {
  .wrapper {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  
}

</style>
