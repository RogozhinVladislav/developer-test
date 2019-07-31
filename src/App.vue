<template>
  <div id="app" class="wrapper">
    <form class="search__wrapper" @submit.prevent="toSearch">
      <input
        type="text"
        class="search__box"
        placeholder="Search..."
        v-model="query"
      />
      <div class="search__buttons">
        <button type="reset" class="search__button search__button--clear" @click.prevent="clearQuery" v-show="query">
          <base-icon-svg name="svg-clear" :width="15" :height="15" color="#b4b4b4" />
        </button>
        <button type="submit" class="search__button search__button--to-find" title="Search" color="#4b4b4b">
          <base-icon-svg name="svg-search" />
        </button>
      </div>
    </form>
    <transition name="page" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>
<script>
import BaseIconSvg from './components/BaseIconSvg'

export default {
  data() {
    return {
      query: this.$route.params.query || ''
    }
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
  computed: {
    loading() {
      return this.$store.getters.loading
    }
  },
  watch: {
    query(val) {
      if (val === '') this.$router.push({ path: '/' })
    }
  },
  components: {
    BaseIconSvg,
  }
}
</script>
<style lang="scss">


.wrapper {
  max-width: 960px;
  margin: 0 auto;
  padding: 20px 10px;
}

.search {
  &__wrapper {
    display: flex;
    position: relative;
    width: 100%;
    margin: 0 auto 10px;
  }

  &__box {
    width: 100%;
    font-size: 18px;
    padding: 15px 20px 15px 25px;
    appearance: none;
    border: none;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
    border-radius: 4px;
  }

  &__buttons {
    display: flex;
    align-items: center;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 0;
    padding-right: 15px;
    height: 100%;
  }

  &__button {
    color: #fff;
    padding: 0;
    margin: 0;
    border: 0;
    background-color: transparent;
    cursor: pointer;
    border: none;
    outline: none;

    &--to-find {
      padding: 5px;
    }

    &--clear {
      margin-right: 7px;
      padding: 5px;
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
</style>
