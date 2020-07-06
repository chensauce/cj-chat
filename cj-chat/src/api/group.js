import request from '@/utils/request'

export function searchGroup(keyword) {
  return request({
    url: '/group/searchgroup',
    method: 'get',
    params: {
      keyword
    }
  })
}
export function addGroup(group_id, message) {
  return request({
    url: '/group/addgroup',
    method: 'post',
    data: {
      group_id, message
    }
  })
}
export function createGroup(data) {
  return request({
    url: '/group/creategroup',
    method: 'post',
    data
  })
}
export function getGroupRequestList() {
  return request({
    url: '/group/getgrouprequestlist',
    method: 'get',
  })
}
export function refuseGroupRequest(group_id, user_id) {
  return request({
    url: '/group/refusegrouprequest',
    method: 'post',
    data:{
      group_id, user_id
    }
  })
}
export function agreeGroupRequest(group_id, user_id) {
  return request({
    url: '/group/agreegrouprequest',
    method: 'post',
    data:{
      group_id, user_id
    }
  })
}
export function getgroupList() {
  return request({
    url: '/group/getgrouplist',
    method: 'get',
  })
}
export function deleteGroup(group_id) {
  return request({
    url: '/group/deletegroup',
    method: 'post',
    data:{
      group_id
    }
  })
}