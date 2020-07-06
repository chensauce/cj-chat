let express = require('express')
let app = express()
let server = app.listen(8888)
let io = require('socket.io').listen(server)
let { verifyToken } = require('./token/token')
require('./socket/socket')(io)
app.disable('x-powered-by')
app.use(express.json())  //创建application/json解析器 获取post请求体
app.use(express.urlencoded({ extended: true }))  //创建application/x-www-form-urlencoded解析器 获取post请求体
app.use(express.static(__dirname + '/public')) //引入静态资源
app.use(function (req, res, next) {   //跨域一步解决
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization,X-Token');
  next();
});
app.use(function (req, res, next) {
  req.now=new Date().getTime()
  if (req.originalUrl == '/user/login' || req.originalUrl == '/user/register' || req.method == 'OPTIONS') {
    next()
  } else {
    if (verifyToken(req.headers['x-token'], req)) {
      next()
    } else {
      res.json({ code: 50018, message: '登录信息已失效，请重新登录！' })
    }
  }
})
const userRouter = require('./router/user');
const friendRouter = require('./router/friend');
const groupRouter = require('./router/group');
const friendMessageRouter = require('./router/friendMessage');
const groupMessageRouter = require('./router/groupMessage');

app.use('/user', userRouter)
app.use('/friend', friendRouter)
app.use('/group', groupRouter)
app.use('/friendmessage', friendMessageRouter)
app.use('/groupmessage', groupMessageRouter)

app.listen(80, err => {
  if (!err) {
    console.log('服务器启动成功')
  }
})