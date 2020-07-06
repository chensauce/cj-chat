var pool = require('./pool');

module.exports = {
  // // 查找用户id
  // select_user(userId) {
  //   var sql = `select * from user where user_id = '${userId}';`;
  //   return pool.execute(sql);
  // },
  // 查找用户名对应的密码
  select_password(userId) {
    var sql = `select password from user where user_id ='${userId}';`;
    return pool.execute(sql);
  },
  // 修改用户密码
  update_password(userId, password) {
    var sql = `update user set password = '${password}' where userid ='${userId}';`;
    return pool.execute(sql);
  },
  //注册新用户
  insert_user(userId, password, nickName) {
    var sql = `INSERT INTO user (user_id,password,nick_name) VALUES ('${userId}','${password}','${nickName}')`
    return pool.execute(sql);
  }
}