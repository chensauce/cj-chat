var jwt = require('jsonwebtoken');

function createToken(userId) {
  return jwt.sign({ userId }, 'cjchat', { expiresIn: 24 * 60 * 60 })  //一天有效有效期
}
function verifyToken(token, req) {
  var flag = true
  jwt.verify(token, 'cjchat', function (err, decode) {
    if (err) {
      flag = false
    } else {
      req.decode = decode;  // 将解码信息储存于req中方便其他路由使用
      flag = true
    }
  })
  return flag
}
module.exports = {
  createToken, verifyToken
}