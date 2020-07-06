var pool = require('./pool');

module.exports = {
  // 查找所有消息
  select_all_message(dispatcher_id,receiver_id) {
    var sql = `select dispatcher_id,receiver_id,message,time from friend_message where (dispatcher_id='${dispatcher_id}' and receiver_id='${receiver_id}') or (dispatcher_id='${receiver_id}' and receiver_id='${dispatcher_id}') ORDER BY time;`;
    return pool.execute(sql);
  },
  //插入消息
  insert_message(dispatcher_id,receiver_id,message,time){
    var sql = `insert into friend_message (dispatcher_id,receiver_id,message,time) values('${dispatcher_id}','${receiver_id}','${message}','${time}');`;
    return pool.execute(sql);
  }
}