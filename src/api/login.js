import api from './index'
import { axios } from '@/utils/request'

/**
 * login func
 * parameter: {
 *     name: '',
 *     password: '',
 * }
 * @param parameter
 * @returns {*}
 */
export function login (parameter) {
  return axios({
    url: api.Login,
    method: 'post',
    data: parameter
  })
}

export function getSmsCaptcha (parameter) {
  return axios({
    url: api.SendSms,
    method: 'post',
    data: parameter
  })
}

export function getInfo () {
  return axios({
    url: api.Info,
    method: 'get'
  })
}

export function getPermissionList () {
  return axios({
    url: api.PermissionList,
    method: 'get'
  })
}

export function getRouters () {
  return axios({
    url: api.Routers,
    method: 'get'
  })
}

export function getCurrentUserNav () {
  return axios({
    url: '/user/getInfo',
    method: 'get'
  })
}

export function logout () {
  return axios({
    url: api.Logout,
    method: 'post'
  })
}

/**
 * get user 2step code open?
 * @param parameter {*}
 */
export function get2step (parameter) {
  return axios({
    url: api.twoStepCode,
    method: 'post',
    data: parameter
  })
}
