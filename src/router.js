import Vue from 'vue'
import Router from 'vue-router'
import RandomJoke from './views/RandomJoke.vue'
import Search from './views/Search.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'random',
      component: RandomJoke
    },
    {
      path: '/:query',
      name: 'search',
      component: Search
    }
  ]
})
