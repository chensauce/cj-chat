import request from '@/utils/request'

export function getGroupMessageList(group_id) {
  return request({
    url: '/groupmessage/getgroupmessagelist',
    method: 'get',
    params: {
      group_id
    }
  })
}