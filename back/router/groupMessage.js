var express = require('express');
var router = express.Router();
var groupMessageDB = require('../db/groupMessageDB');

router.get('/getgroupmessagelist',(req,res)=>{
  console.log(req.query.group_id)
  console.log(req.decode.user_id)
  groupMessageDB.select_all_message(req.query.group_id).then(response=>{
    res.json({ code: 20000, data: { groupMessageList: response } })
  }).catch(err => {
    console.log(err)
    res.json({ code: 50000, message: '服务器错误!' })
  })
})

module.exports = router;