import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const USER_KEY = 'TOKEN_KEY'
export default new Vuex.Store({
  state: {
    user: JSON.parse(localStorage.getItem(USER_KEY))
  },
  mutations: {
    setToken(state, payload) {
      state.user = payload
      localStorage.setItem(USER_KEY, JSON.stringify(payload))
    }
  },
  actions: {},
  modules: {}
})
