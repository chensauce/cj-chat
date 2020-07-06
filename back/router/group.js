var express = require('express');
var path = require('path')
var router = express.Router();
var groupDB = require('../db/groupDB');
let multer = require('multer');

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //指定文件保存路径
    cb(null, path.resolve(__dirname, '../public/'));
  },
  filename: function (req, file, cb) {
    // 将保存文件名设置为 时间戳 + 文件原始名，比如 151342376785-123.jpg
    cb(null, `group-${req.decode.userId}-${req.now}.${file.originalname.split('.')[1]}`);

  }
})
let upload = multer({ storage });

router.get('/searchgroup', async (req, res) => {
  console.log(req.decode)
  console.log(req.query)
  try {
    let response1 = await groupDB.select_group(req.query.keyword)
    let tempList = []
    console.log(response1)
    response1.forEach(item => {
      item.group_name = item.group_name.replace(req.query.keyword, '<em>' + req.query.keyword + '</em>')
      tempList.push(groupDB.select_is_group_member(req.decode.userId, item.group_id))
    });
    Promise.all(tempList).then(response => {
      console.log(response)
      for (let i = 0; i < response.length; i++) {
        response1[i].state = response[i].length > 0 ? response[i][0].state : 0
      }
      res.json({ code: 20000, data: { groupList: response1 } })
    })
  } catch (error) {
    console.log(error)
    res.json({ code: 50000, message: '服务器错误!' })
  }
})
router.post('/addgroup', async (req, res) => {
  console.log(req.decode)
  console.log(req.body)
  try {
    let response1 = await groupDB.select_is_group_member(req.decode.userId, req.body.group_id)
    console.log(response1)
    if (response1.length == 0) {

      groupDB.insert_group_member(req.decode.userId, req.body.group_id, req.body.message).then(response => {
        res.json({ code: 20000, data: { message: '申请成功!' } })
      })
    }
    else if (response1[0].state == 1) {
      res.json({ code: 50000, message: '已经申请过了哦！' })
    } else if (response1[0].state == 2) {
      res.json({ code: 50000, message: '已经进群了哦！' })
    }
  } catch (error) {
    console.log(error)
    res.json({ code: 50000, message: '服务器错误!' })
  }
})
router.post('/creategroup', upload.array('files'), (req, res) => {
  console.log(req.decode)
  // console.log(req.body.userInfo)
  console.log(req.files)
  console.log(req.body.group_name)
  console.log(req.body.inviteList)
  if (!/(jpg|png)$/.test(req.files[0].originalname)) {
    res.json({ code: 50000, message: '只支持上传.jpg、.png格式的文件' })
    return
  }
  let avatar = `http://localhost/group-${req.decode.userId}-${req.now}.${req.files[0].originalname.split('.')[1]}?v=${new Date().getTime()}`
  groupDB.insert_group(req.decode.userId, req.body.group_name, avatar).then(response => {
    console.log(response)
    let tempList = []
    if (req.body.inviteList.length > 0) {
      req.body.inviteList.split(",").forEach(item => {
        tempList.push(groupDB.insert_group_member_create(item, response.insertId))
      })
    }
    tempList.push(groupDB.insert_group_member_create(req.decode.userId, response.insertId))
    Promise.all(tempList).then(response2 => {
      res.json({ code: 20000, data: { message: '创建成功!' } })
    }).catch(err => {
      console.log(err)
      res.json({ code: 50000, message: '服务器错误!' })
    })
  }).catch(err => {
    console.log(err)
    res.json({ code: 50000, message: '服务器错误!' })
  })
})
router.get('/getgrouprequestlist', async (req, res) => {
  console.log(req.decode)
  groupDB.select_group_list(req.decode.userId).then(response => {
    res.json({ code: 20000, data: { groupRequestList: response } })
  }).catch(err => {
    console.log(err)
    res.json({ code: 50000, message: '服务器错误!' })
  })
})
router.post('/refusegrouprequest', (req, res) => {
  console.log(req.body)
  groupDB.update_refuse_request_group(req.body.group_id, req.body.user_id).then(response => {
    res.json({ code: 20000, data: { message: '已拒绝' } })
  }).catch(err => {
    console.log(err)
    res.json({ code: 50000, message: '服务器错误!' })
  })
})
router.post('/agreegrouprequest', (req, res) => {
  console.log(req.body)
  groupDB.update_agree_request_group(req.body.group_id, req.body.user_id).then(response => {
    res.json({ code: 20000, data: { message: '已同意' } })
  }).catch(err => {
    console.log(err)
    res.json({ code: 50000, message: '服务器错误!' })
  })
})
router.get('/getgroupList', (req, res) => {
  console.log(req.body)
  groupDB.select_my_group(req.decode.userId).then(response => {
    res.json({ code: 20000, data: { groupList: response } })
  }).catch(err => {
    console.log(err)
    res.json({ code: 50000, message: '服务器错误!' })
  })
})
router.post('/deletegroup',(req,res)=>{
  groupDB.delete_group(req.body.group_id,req.decode.userId).then(response=>{
    res.json({ code: 20000, data: { message: '已退出群聊' } })
  }).catch(err => {
    console.log(err)
    res.json({ code: 50000, message: '服务器错误!' })
  })
})
module.exports = router;