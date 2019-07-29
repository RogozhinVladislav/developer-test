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
        <button type="reset" class="clear-btn" @click.prevent="clearQuery">
          <img src="./assets/clear.svg" alt="Clear" title="Clear">
        </button>
        <button type="submit" class="search-btn">
          <img src="./assets/search.svg" alt="Search" title="Search">
        </button>
      </div>
    </form>
    <transition name="page" mode="out-in">
      <router-view/>
    </transition>
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
  position: relative;
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
  align-items: center;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 0;
  padding-right: 15px;
  height: 100%;

  button {
    color: #fff;
    padding: 0;
    margin: 0;
    border: 0;
    background-color: transparent;
    cursor: pointer;
    border: none;
    outline: none;

    img {
      width: 23px;
    }
  }

  .search-btn {
    padding: 5px;

    img {
      width: 23px;
    }
  }

  .clear-btn {
    margin-right: 7px;
    padding: 5px;

    img {
      width: 15px;
    }
  }
}

@media screen and (max-width: 768px) {
  .wrapper {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  
}

.page-enter-active, .page-leave-active {
  transition: opacity .5s, transform .5s;
}
.page-enter, .page-leave-to {
  opacity: 0;
  transform: translateX(-30%);
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

.slide-leave-active,
.slide-enter-active {
  transition: .5s;
}
.slide-enter {
  transform: translate(100%, 0);
}
.slide-leave-to {
  transform: translate(-100%, 0);
}

</style>
