var express = require('express');
var router = express.Router();
var friendMessageDB = require('../db/friendMessageDB');

router.get('/getfriendmessagelist',(req,res)=>{
  console.log(req.query.friend_id)
  console.log(req.decode.userId)
  friendMessageDB.select_all_message(req.decode.userId,req.query.friend_id).then(response=>{
    res.json({ code: 20000, data: { friendMessageList: response } })
  }).catch(err => {
    console.log(err)
    res.json({ code: 50000, message: '服务器错误!' })
  })
})

module.exports = router;