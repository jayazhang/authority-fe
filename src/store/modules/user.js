import Vue from 'vue'
import { login, getInfo, logout, getRouters, getPermissionList } from '@/api/login'
import { ACCESS_TOKEN, REFRESH_TOKEN, TOKEN_TYPE } from '@/store/mutation-types'
import { welcome } from '@/utils/util'

const user = {
  state: {
    token: '',
    name: '',
    welcome: '',
    avatar: '',
    roles: [],
    info: {}
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, { name, welcome }) => {
      state.name = name
      state.welcome = welcome
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_INFO: (state, info) => {
      state.info = info
    }
  },

  actions: {
    // 登录
    Login ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(response => {
          const result = response.data
          const expires = result.expires_in || 7 * 24 * 60 * 60 * 1000
          Vue.ls.set(ACCESS_TOKEN, result.access_token, expires)
          Vue.ls.set(REFRESH_TOKEN, result.refresh_token)
          Vue.ls.set(TOKEN_TYPE, result.token_type)
          commit('SET_TOKEN', result.access_token)
          resolve()
        }).catch(error => {
          console.log(error, 'error')
          reject(error)
        })
      })
    },

    GetRouters () {
      return new Promise((resolve, reject) => {
        getRouters().then(res => {
          resolve(res.data)
        })
      })
    },

    GetPermissionList ({ commit }) {
      return new Promise((resolve, reject) => {
        getPermissionList().then(res => {
          commit('SET_ROLES', res.data)
          resolve(res.data)
        })
      })
    },

    // 获取用户信息
    GetInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          const result = response.data

          // if (result.role && result.role.permissions.length > 0) {
          //   const role = result.role
          //   role.permissions = result.role.permissions
          //   role.permissions.map(per => {
          //     if (per.actionEntitySet != null && per.actionEntitySet.length > 0) {
          //       const action = per.actionEntitySet.map(action => { return action.action })
          //       per.actionList = action
          //     }
          //   })
          //   role.permissionList = role.permissions.map(permission => { return permission.permissionId })
          //   commit('SET_ROLES', result.role)
          // } else {
          //   reject(new Error('getInfo: roles must be a non-null array !'))
          // }
          commit('SET_INFO', result)
          commit('SET_NAME', { name: result.display_name, welcome: welcome() })
          commit('SET_AVATAR', result.worker_avatar || 'https://lh3.googleusercontent.com/proxy/hVjEfMufBEqx41xu6qjU_t0MMzLYuHc55oDpZ_ve2lu6WMs5dUIBZ6UD2Z2F921tA0dvPNxny5RJ8HYVIJ11-VVFDSnByMGS7cBNym72t39i')

          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    Logout ({ commit, state }) {
      return new Promise((resolve) => {
        logout(state.token).then(() => {
          resolve()
        }).catch(() => {
          resolve()
        }).finally(() => {
          Vue.ls.remove(ACCESS_TOKEN, '')
          Vue.ls.remove(REFRESH_TOKEN, '')
          Vue.ls.remove(TOKEN_TYPE, '')
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
        })
      })
    }

  }
}

export default user
