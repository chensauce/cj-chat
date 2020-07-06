var pool = require('./pool');

module.exports = {
  // 查找用户信息
  select_userinfo(userId) {
    var sql = `select user_id,nick_name,sex,birthday,signature,tel,email,avatar from user where user_id = '${userId}';`;
    return pool.execute(sql);
  },
  // 修改用户信息
  update_userinfo( userId, userInfo) {
    var sql = `update user set nick_name='${userInfo.nick_name}',sex=${userInfo.sex},birthday='${userInfo.birthday}',signature='${userInfo.signature}', tel = '${userInfo.tel}' , email = '${userInfo.email}' where user_id ='${userId}';`;
    return pool.execute(sql);
  },
  // 修改用户头像
  update_avatar( userId, avatar) {
    var sql = `update user set avatar = '${avatar}' where user_id ='${userId}';`;
    return pool.execute(sql);
  },
}