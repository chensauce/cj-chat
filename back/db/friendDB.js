var pool = require('./pool');

module.exports = {
  // 查找用户
  select_user(userId,nickName) {
    var sql = `select user_id,nick_name,avatar from user where nick_name like '%${nickName}%'and user_id != '${userId}';`;
    return pool.execute(sql);
  },
  // 判断是否是好友
  select_is_friend(user_id,friend_id){
    var sql = `select state from friend where user_id='${user_id}' and friend_id='${friend_id}';`;
    return pool.execute(sql);
  },
  select_friend_id(user_id){
    var sql = `select friend_id from friend where user_id='${user_id}' and state=2;`;
    return pool.execute(sql);
  },
  select_friend_info(user_id){
    var sql = `select user_id,nick_name,avatar from user where user_id='${user_id}';`;
    return pool.execute(sql);
  },
  insert_request_friend(user_id, friend_id, message) {
    var sql = `insert into friend (user_id,friend_id,state,apply_message,time) values (${user_id},${friend_id},1,'${message}','${new Date().getTime()}');`;
    return pool.execute(sql);
  },
  select_request_friend(friend_id){
    var sql = `select user_id,apply_message,time from friend where friend_id='${friend_id}' and state=1;`;
    return pool.execute(sql);
  },
  select_request_friend_info(user_id){
    var sql = `select nick_name,avatar from user where user_id='${user_id}';`;
    return pool.execute(sql);
  },
  delete_request_friend(user_id,friend_id){
    var sql = `delete from friend where user_id='${user_id}' and friend_id='${friend_id}';`;
    return pool.execute(sql);
  },
  update_request_friend(user_id,friend_id){
    var sql = `update friend set state=2 where user_id='${user_id}' and friend_id='${friend_id}';`;
    return pool.execute(sql);
  },
  insert_friend(user_id,friend_id){
    var sql = `INSERT INTO friend (user_id,friend_id,state) VALUES ('${user_id}','${friend_id}',2)  ON DUPLICATE KEY UPDATE state=2;`;
    return pool.execute(sql);
  },
  select_my_friend(user_id){
    var sql = `select a.user_id,a.friend_id,b.nick_name,b.avatar,b.signature from friend a LEFT JOIN user b on a.friend_id=b.user_id where a.user_id='${user_id}' and a.state=2;`;
    return pool.execute(sql);
  },
  delete_friend(user_id,friend_id){
    var sql = `delete from friend where user_id='${user_id}' and friend_id=${friend_id};`;
    return pool.execute(sql);
  }
  
  // // 修改用户信息
  // update_userinfo( userId, userInfo) {
  //   var sql = `update user set nick_name='${userInfo.nick_name}',sex=${userInfo.sex},birthday='${userInfo.birthday}',signature='${userInfo.signature}', tel = '${userInfo.tel}' , email = '${userInfo.email}' where user_id ='${userId}';`;
  //   return pool.execute(sql);
  // },
  // // 修改用户头像
  // update_avatar( userId, avatar) {
  //   var sql = `update user set avatar = '${avatar}' where user_id ='${userId}';`;
  //   return pool.execute(sql);
  // },
}