var pool = require('./pool');

module.exports = {
  // 查找所有消息
  select_all_message(group_id) {
    var sql = `select dispatcher_id,message,time,b.avatar from group_message a LEFT JOIN user b on a.dispatcher_id=b.user_id where group_id= ${group_id} ORDER BY time;`;
    return pool.execute(sql);
  },
  //插入消息
  insert_message(group_id,dispatcher_id,message,time){
    var sql = `insert into group_message (group_id,dispatcher_id,message,time) values(${group_id},'${dispatcher_id}','${message}','${time}');`;
    return pool.execute(sql);
  }
}