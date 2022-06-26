import Vue from 'vue'
import Vuex from 'vuex'
import VuexP from 'vuex-persist'
Vue.use(Vuex)
const vuexLocal = new VuexP({
  storage: window.localStorage
})
export default new Vuex.Store({
  state: {
    user: {}
  },
  getters: {
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [vuexLocal.plugin]
})
