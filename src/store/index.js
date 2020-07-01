/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules'

import createPersistedState from 'vuex-persistedstate'
import SecureLS from 'secure-ls'
var ls = new SecureLS({ isCompression: false })

Vue.use(Vuex)

export default new Vuex.Store({
  modules,
  actions: {
    LOGOUT({ commit }) {
      Object.keys(modules).forEach(modulesName => {
        commit(`${modulesName}/RESET_STATE`)
        localStorage.removeItem('Access-Token')
      })
      return true
    }
  },
  plugins: [
    createPersistedState({
      storage: {
        key: '1qaz2wsx3edc4rfv5tgb6yhn7ujm8ik9ol0p',
        paths: ['user.users'],
        getItem: key => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: key => ls.remove(key)
      }

    })
  ]
})
