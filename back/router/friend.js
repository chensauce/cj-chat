var express = require('express');
var router = express.Router();
var friendDB = require('../db/friendDB');

router.get('/searchfriend', async (req, res) => {
  console.log(req.decode)
  console.log(req.query)
  try {
    let response1 = await friendDB.select_user(req.decode.userId, req.query.keyword)
    let tempList = []
    response1.forEach(item => {
      item.nick_name = item.nick_name.replace(req.query.keyword, '<em>' + req.query.keyword + '</em>')
      tempList.push(friendDB.select_is_friend(req.decode.userId, item.user_id))
    });
    Promise.all(tempList).then(response => {
      console.log(response)
      for (let i = 0; i < response.length; i++) {
        response1[i].state = response[i].length > 0 ? response[i][0].state : 0
      }
      res.json({ code: 20000, data: { userList: response1 } })
    })
  } catch (error) {
    console.log(error)
    res.json({ code: 50000, message: '服务器错误!' })
  }
})
router.post('/addfriend', async (req, res) => {
  console.log(req.decode)
  console.log(req.body)
  try {
    let response1 = await friendDB.select_is_friend(req.decode.userId, req.body.target_user_id)
    console.log(response1)
    if (response1.length == 0) {
      friendDB.insert_request_friend(req.decode.userId, req.body.target_user_id, req.body.message).then(response => {
        res.json({ code: 20000, data: { message: '申请成功!' } })
      })
    }
    else if (response1[0].state == 1) {
      res.json({ code: 50000, message: '已经申请过了哦！' })
    } else if (response1[0].state == 2) {
      res.json({ code: 50000, message: '已经是好友了哦！' })
    }
  } catch (error) {
    console.log(error)
    res.json({ code: 50000, message: '服务器错误!' })
  }
})
router.get('/getallfriend', async (req, res) => {
  try {
    let response1 = await friendDB.select_friend_id(req.decode.userId)
    console.log(response1)
    let tempList = []
    response1.forEach(item => {
      tempList.push(friendDB.select_friend_info(item.friend_id))
    })
    Promise.all(tempList).then(response => {
      console.log(response)
      let result = []
      response.forEach(item => {
        result.push(item[0])
      })
      res.json({ code: 20000, data: { friendList: result } })
    })
  } catch (error) {
    console.log(err)
    res.json({ code: 50000, message: '服务器错误!' })
  }
})
router.get('/getfriendrequestlist', async (req, res) => {
  try {
    let response1 = await friendDB.select_request_friend(req.decode.userId)
    console.log(response1)
    let tempList = []
    response1.forEach(item => {
      tempList.push(friendDB.select_request_friend_info(item.user_id))
    })
    Promise.all(tempList).then(response => {
      console.log(response)
      for (let i = 0; i < response1.length; i++) {
        response1[i].nick_name = response[i][0].nick_name
        response1[i].avatar = response[i][0].avatar
      }
      console.log(response1)
      res.json({ code: 20000, data: { friendRequestList: response1 } })
    })
  } catch (error) {
    console.log(error)
    res.json({ code: 50000, message: '服务器错误!' })
  }
})

router.post('/refusefriendrequest', (req, res) => {
  console.log(req.decode.userId)  //friend_id  被请求方
  console.log(req.body.user_id)
  friendDB.delete_request_friend(req.body.user_id, req.decode.userId).then(response => {
    res.json({ code: 20000, data: { message: '已拒绝' } })
  }).catch(err => {
    console.log(err)
    res.json({ code: 50000, message: '服务器错误!' })
  })
})
router.post('/agreefriendrequest', async (req, res) => {
  console.log(req.decode.userId)  //friend_id  被请求方
  console.log(req.body.user_id)
  Promise.all([friendDB.update_request_friend(req.body.user_id, req.decode.userId), friendDB.insert_friend(req.decode.userId, req.body.user_id)]).then(response => {
    res.json({ code: 20000, data: { message: '已添加' } })
  }).catch(error => {
    console.log(error)
    res.json({ code: 50000, message: '服务器错误!' })
  })
})

router.get('/getfriendlist',(req,res)=>{
  friendDB.select_my_friend(req.decode.userId).then(response=>{
    console.log(response)
    res.json({ code: 20000, data: { friendList: response } })
  }).catch(error => {
    console.log(error)
    res.json({ code: 50000, message: '服务器错误!' })
  })
})
router.post('/deletefriend',(req,res)=>{
  Promise.all([friendDB.delete_friend(req.decode.userId,req.body.friend_id),friendDB.delete_friend(req.body.friend_id,req.decode.userId)]).then(response=>{
    console.log(response)
    res.json({ code: 20000, data: { message: '已删除好友' } })
  }).catch(error => {
    console.log(error)
    res.json({ code: 50000, message: '服务器错误!' })
  })
})
module.exports = router;