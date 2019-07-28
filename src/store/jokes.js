import * as api from '@/api'

class Joke {
  constructor ({ id, value, icon_url: icon, updated_at: updatedAt, url }) {
    this.id = id
    this.value = value
    this.icon = icon
    this.updatedAt = updatedAt
    this.url = url
  }
}

export default {
  state: {
    randomJoke: null,
    searchJokes: [],
    categories: []
  },
  mutations: {
    setRandomJoke (state, payLoad) {
      state.randomJoke = payLoad
    },
    setSearchJokes (state, payLoad) {
      state.searchJokes = payLoad
    },
    setCategories (state, payLoad) {
      state.categories = payLoad
    }
  },
  actions: {
    async fetchRandomJoke ({ commit }, payLoad) {
      commit('clearError')
      commit('setLoading', true)
      try {
        const response = await api.fetchRandomJoke(payLoad)
        if (!response.ok) return
        const responseJson = await response.json()
        commit('setRandomJoke', new Joke(responseJson))
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    async fetchJokesByQuery ({ commit }, payload) {
      commit('clearError')
      commit('setLoading', true)
      try {
        const response = await api.fetchJokesByQuery(payload)
        const responseJson = await response.json()
        if (response.status === 400) throw new Error(responseJson.message)
        let { result } = responseJson
        const { total } = responseJson
        if (total > 100) {
          const shuffled = result.sort(() => 0.5 - Math.random())
          result = shuffled.slice(0, 100)
        }
        commit('setSearchJokes', result.map(item => new Joke(item)))
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    async fetchCategories ({ commit }) {
      try {
        const response = await api.fetchCategories()
        if (!response.ok) return
        const responseJson = await response.json()
        commit('setCategories', responseJson)
        commit('setLoading', false)
      } catch (error) {
        throw error
      }
    }
  },
  getters: {
    randomJoke (state) {
      return state.randomJoke
    },
    searchJokes (state) {
      return state.searchJokes
    },
    categories (state) {
      return state.categories
    }
  }
}
