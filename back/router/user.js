var express = require('express');
var md5 = require('md5')
var path = require('path')
var router = express.Router();
var userDB = require('../db/userDB');
var userInfoDB = require('../db/userInfoDB')
var { createToken } = require('../token/token')
let multer = require('multer');
// var storage = multer.memoryStorage()  //内存存储引擎，将文件保存在内存，buffer包含文件所有信息,不适合大文件
// const upload = multer({ storage });

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //指定文件保存路径
    cb(null, path.resolve(__dirname, '../public/'));
  },
  filename: function (req, file, cb) {
    console.log(file)
    // 将保存文件名设置为 时间戳 + 文件原始名，比如 151342376785-123.jpg
    cb(null, req.decode.userId + '.' + file.originalname.split('.')[1]);

  }
})
let upload = multer({ storage });

router.post('/login', (req, res) => {
  console.log(req.body)
  const userId = req.body.userId
  const password = md5(req.body.password)
  userDB.select_password(userId, password).then(response => {
    console.log(response)
    if (response.length == 0) {
      res.json({ code: 50000, message: '账号或密码错误，请重新输入！' })
    } else {
      var token = createToken(userId)
      res.json({ code: 20000, data: { token } })
    }
  }).catch(err => {
    console.log(err)
    res.json({ code: 50000, message: '账号或密码错误，请重新输入！' })
  })
})
router.post('/register', (req, res) => {
  console.log(req.body)
  const userId = req.body.userId
  const password = md5(req.body.password)
  const nickName = req.body.nickName
  userDB.insert_user(userId, password, nickName).then(response => {
    res.json({ code: 20000, data: { message: '注册成功，快去登录吧！' } })
  }).catch(err => {
    console.log(err)
    res.json({ code: 50000, message: '注册失败，该用户已注册！' })
  })
})
router.get('/getUserInfo', (req, res) => {
  console.log(req.decode)
  userInfoDB.select_userinfo(req.decode.userId).then(response => {
    console.log(response)
    res.json({ code: 20000, data: { userInfo: response[0] } })
  }).catch(err => {
    console.log(err)
    res.json({ code: 50000, message: '服务器错误!' })
  })
})
router.post('/updateUserInfo', (req, res) => {
  console.log(req.decode)
  console.log(req.body.userInfo)
  userInfoDB.update_userinfo(req.decode.userId, req.body.userInfo).then(response => {
    console.log(response)
    res.json({ code: 20000, data: { message: '保存成功!' } })
  }).catch(err => {
    console.log(err)
    res.json({ code: 50000, message: '服务器错误!' })
  })
})
router.post('/updateAvatar', upload.array('files'), (req, res) => {
  console.log(req.decode)
  // console.log(req.body.userInfo)
  console.log(req.files)
  if (!/(jpg|png)$/.test(req.files[0].originalname)) {
    res.json({ code: 50000, message: '只支持上传.jpg、.png格式的文件' })
    return
  }
  let avatar = `http://localhost/${req.decode.userId}.${req.files[0].originalname.split('.')[1]}?v=${new Date().getTime()}`
  userInfoDB.update_avatar(req.decode.userId, avatar).then(response => {
    console.log(response)
    res.json({ code: 20000, data: { message: '保存成功!' } })
  }).catch(err => {
    console.log(err)
    res.json({ code: 50000, message: '服务器错误!' })
  })
})
module.exports = router;