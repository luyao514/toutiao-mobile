import Vue from 'vue'
import Vuex from 'vuex'
import {
  getItem,
  setItem
} from '../utils/storage'

Vue.use(Vuex)
// 声明token的key值
const USER_KEY = 'TOKEN_KEY'
export default new Vuex.Store({
  state: {
    user: getItem(USER_KEY)
  },
  mutations: {
    setToken(state, payload) {
      state.user = payload
      setItem(USER_KEY, payload)
    }
  },
  actions: {},
  modules: {}
})
