import request from '@/utils/request'

export function searchFriend(keyword) {
  return request({
    url: '/friend/searchfriend',
    method: 'get',
    params: {
      keyword
    }
  })
}
export function addFriend(user_id, message) {
  return request({
    url: '/friend/addfriend',
    method: 'post',
    data: {
      target_user_id: user_id,
      message
    }
  })
}
export function getAllFriend() {
  return request({
    url: '/friend/getallfriend',
    method: 'get',
  })
}
export function getFriendRequestList() {
  return request({
    url: '/friend/getfriendrequestlist',
    method: 'get',
  })
}

export function refuseFriendRequest(user_id) {
  return request({
    url: '/friend/refusefriendrequest',
    method: 'post',
    data: {
      user_id
    }
  })
}
export function agreeFriendRequest(user_id) {
  return request({
    url: '/friend/agreefriendrequest',
    method: 'post',
    data: {
      user_id
    }
  })
}
export function getFriendList() {
  return request({
    url: '/friend/getfriendlist',
    method: 'get',
  })
}
export function deleteFriend(friend_id) {
  return request({
    url: '/friend/deletefriend',
    method: 'post',
    data: {
      friend_id
    }
  })
}