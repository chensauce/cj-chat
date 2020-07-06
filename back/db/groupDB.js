var pool = require('./pool');

module.exports = {

  //查找群组
  select_group(group_name) {
    var sql = `select group_id,group_name,avatar from group_info where group_name like '%${group_name}%';`;
    return pool.execute(sql);
  },
  select_is_group_member(user_id, group_id) {
    var sql = `select state from group_member where group_id='${group_id}' and user_id='${user_id}';`;
    return pool.execute(sql);
  },
  insert_group_member(user_id, group_id, message) {
    var sql = `insert into group_member (group_id,user_id,state,apply_message,time) values (${group_id},'${user_id}',1,'${message}',${new Date().getTime()});`;
    return pool.execute(sql);
  },
  insert_group_member_create(user_id, group_id) {
    var sql = `insert into group_member (group_id,user_id,state) values (${group_id},'${user_id}',2);`;
    return pool.execute(sql);
  },
  //创建新群
  insert_group(group_own_id, group_name, avatar) {
    var sql = `insert into group_info (group_owner_id,group_name,avatar) values ('${group_own_id}','${group_name}','${avatar}')`;
    return pool.execute(sql);
  },
  select_group_list(group_owner_id) {
    var sql = `select a.group_id,group_name,b.user_id,apply_message,time,c.nick_name,c.avatar from group_info a left join group_member b on a.group_id = b.group_id left join user c on b.user_id=c.user_id where a.group_owner_id='${group_owner_id}' and b.state=1`;
    return pool.execute(sql);
  },
  update_agree_request_group(group_id, user_id) {
    var sql = `update group_member set state=2 where group_id='${group_id}' and user_id='${user_id}';`;
    return pool.execute(sql);
  },
  update_refuse_request_group(group_id, user_id) {
    var sql = `delete from group_member where group_id='${group_id}' and user_id='${user_id}';`;
    return pool.execute(sql);
  },
  select_my_group(user_id) {
    var sql = `select a.group_id,b.group_name,b.avatar from group_member a left join group_info b on a.group_id = b.group_id  where a.user_id='${user_id}' and a.state=2;`;
    return pool.execute(sql);
  },
  delete_group(group_id,user_id){
    var sql = `delete from group_member where group_id=${group_id} and user_id='${user_id}';`;
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