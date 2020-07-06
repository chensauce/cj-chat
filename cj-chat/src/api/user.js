import request from '@/utils/request'

export function register(data) {
  return request({
    url: '/user/register',
    method: 'post',
    data
  })
}

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function getUserInfo() {
  return request({
    url: '/user/getUserInfo',
    method: 'get',
  })
}
export function updateUserInfo(userInfo) {
  return request({
    url: '/user/updateUserInfo',
    method: 'post',
    data: {
      userInfo
    }
  })
}

export function updateAvatar(data) {
  return request({
    url: '/user/updateAvatar',
    method: 'post',
    data,
  })
}
