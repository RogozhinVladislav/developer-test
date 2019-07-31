<template>
  <div class="random-wrapper">
    <div class="categories-wrapper" v-on-clickaway="onClickAway">
      <div class="categories-select-button" @click="toggleShowCategories">
        <div class="categories-selected-value">
          {{selectedCategory !== 'all' ? selectedCategory : 'Select category'}}
        </div>
        <base-icon-svg name="svg-category" :width="20" :height="20" />
      </div>
      <transition name="fade">
        <ul v-if="showCategories || windowWidth > 768" class="categories">
          <category-item
           v-for="(category, index) in categories" 
           :category="category" 
           :key="`category-${index}`"
           :selectedCategory="selectedCategory"
           @changeCategory="changeCategory"
          />
        </ul>
      </transition>
    </div>
    <div class="random-joke-wrapper">
      <div v-if="!loading" class="random-joke">
        <div class="chuck" />
        <h2 class="random-joke-text">{{randomJoke.value}}</h2>
        <div class="refresh-btn-wrapper">
          <button class="refresh-btn btn" @click="refreshJoke">Refresh</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mixin as clickaway } from "vue-clickaway"
import { mapGetters } from 'vuex'
import BaseIconSvg from '@/components/BaseIconSvg'
import CategoryItem from '@/components/CategoryItem'

export default {
  name: 'RandomJoke',
  data() {
    return {
      selectedCategory: 'all',
      showCategories: false,
      windowWidth: 0
    }
  },
  methods: {
    changeCategory(category) {
      this.selectedCategory = category
      this.$store.dispatch('fetchRandomJoke', category)
    },
    refreshJoke() {
      this.$store.dispatch('fetchRandomJoke', this.selectedCategory)
    },
    toggleShowCategories() {
      this.showCategories = !this.showCategories
    },
    onClickAway() {
      if (this.showCategories) {
        this.showCategories = false
      }
    },
    handleResize() {
      this.windowWidth = window.innerWidth
    }
  },
  computed: {
    categories() {
      return [
        'all',
        ...this.$store.getters.categories
      ]
    },
    ...mapGetters([
      'loading',
      'error',
      'randomJoke',
    ])
  },
  created() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },
  mounted() {
    this.$store.dispatch('fetchCategories')
    this.$store.dispatch('fetchRandomJoke')
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize)
  },
  components: {
    CategoryItem,
    BaseIconSvg,
  },
  mixins: [clickaway]
}
</script>
<style lang="scss">
.random-wrapper {
  display: flex;
  border-radius: 5px;
  background-color: #fcfeff;
}

.categories {
  padding: 0;
  margin: 0;

  &-wrapper {
    padding: 10px 40px 10px 10px;
    margin-top: 5px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  }

  &-select-button {
    display: none;
  }
}

.random-joke {
  text-align: center;

  &-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
    padding: 10px 40px;
  }

  &-text {
    transition: all 0.5s ease;
  }
}

.refresh-btn {
  height: 35px;
  padding: 0 30px;
  font-size: 16px;
}

@media screen and (max-width: 768px) {
  .random-wrapper {
    flex-direction: column;
    flex-grow: 1;
    margin: 0;
  }

  .random-joke-wrapper {
    padding: 10px 10px 60px 10px;
  }

  .categories {
    position: absolute;
    top: 140px;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100vw;
    padding-top: 10px;
    padding-bottom: 20px;
    background-color: #fff;
    border-radius: 4px;
    z-index: 2;

    &-wrapper {
      padding: 0;
      border-radius: 4px;
    }

    &-select-button {
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      padding: 8px 14px;
      background-color: #fff;
      cursor: pointer;
      border: 1px solid #e2eded;
    }
  }

  .refresh-btn-wrapper {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 60px;
    background-color: #ffffff;
    z-index: 1;
  }
}

</style>

