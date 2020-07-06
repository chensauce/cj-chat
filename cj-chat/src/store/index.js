import Vue from 'vue'
import Vuex from 'vuex'
import { getUserInfo, login } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: getToken(),
    userInfo: ""
  },
  mutations: {
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    RESET_STATE: (state) => {
      state.token = ""
      state.userInfo = {}
    },
  },
  actions: {
    login({ commit }, data) {
      return new Promise((resolve, reject) => {
        login(data).then(response => {
          const token = response.data.token
          commit('SET_TOKEN',token)
          setToken(token)
          resolve(token)
        }).catch(error => {
          reject(error)
        })
      })
    },
    getUserInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getUserInfo().then(response => {
          const userInfo = response.data.userInfo
          console.log(userInfo)
          commit('SET_USERINFO', userInfo)
          resolve(userInfo)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // user logout
    logout({ commit, state }) {
      return new Promise((resolve, reject) => {
          removeToken() // must remove  token  first
          commit('RESET_STATE')
          resolve()
      })
    },

    // remove token
    resetToken({ commit }) {
      return new Promise(resolve => {
        removeToken() // must remove  token  first
        commit('RESET_STATE')
        resolve()
      })
    },
  },
  getters: {
    token: (state) => state.token,
    userInfo: (state) => state.userInfo
  }
})
