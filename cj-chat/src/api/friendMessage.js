import request from '@/utils/request'

export function getFriendMessageList(friend_id) {
  return request({
    url: '/friendmessage/getfriendmessagelist',
    method: 'get',
    params: {
      friend_id
    }
  })
}