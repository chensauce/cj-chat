let friendMessageDB=require('../db/friendMessageDB')
var groupMessageDB = require('../db/groupMessageDB');
module.exports = function (io) {
  var socketList = new Map() //保存登录进来的用户的信息，包括socket.id

  io.on('connection', socket => {
    console.log('socket 连接成功')
    //接受信息
    socket.on('join', data => {
      console.log(data.user_id)
      socket.user_id = data.user_id
      socketList.set(data.user_id, socket.id)//每个连接的唯一标识
      //如果是群聊就加入群聊房间
      data.group_id && socket.join(`${data.group_id}`, () => {
      });
      //广播
      // socket.broadcast.emit('gbmsg', `欢迎 ${name} 加入群聊`)
    })
    //好友之间发送
    socket.on('sendFriendMessage', data => {
      var now = new Date().getTime()
      socketList.has(data.receiver_id) && socket.to(socketList.get(data.receiver_id)).emit('receivedFriendMessage', { message: data.message, time: now })
      //向自己发送消息，保证时间一致
      socket.emit('dispatchMessage', { message: data.message, time: now })
      friendMessageDB.insert_message(data.dispatcher_id,data.receiver_id,data.message,now)
    })
    // 群聊发送信息
    socket.on('sendGroupMessage', data => {
      var now = new Date().getTime()
      socket.to(`${data.group_id}`).emit('receiveGroupMessage',{ message: data.message, time: now,dispatcher_avatar:data.dispatcher_avatar });
      //给自己发送,保证时间的一致性
      socket.emit('dispatchMessage', { message: data.message, time: now })
      //存库
      groupMessageDB.insert_message(data.group_id,data.dispatcher_id,data.message,now)
    })
    //断开连接
    socket.on('disconnecting', () => {
      console.log("实例销毁")
      socketList.has(socket.user_id) && delete socketList.delete(socket.user_id)
    })
  })
}