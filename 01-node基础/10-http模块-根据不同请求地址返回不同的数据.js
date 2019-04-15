//  根据不同的请求，返回不同的数据
// 判断 req.url， 根据不同的 url 返回不同的数据
const http = require('http')
const server = http.createServer()
server.on('request', (req, res) => {
  res.setHeader('content-type', 'text/html;charset=utf-8')
  if (req.url.startsWith('/index')) {
    res.end('<h1>首页</h1>')
  } else if (req.url.startsWith('/login')) {
    res.end('<h1>登录页面</h1>')
  }
})
server.listen(9999, () => console.log('http://localhost:9999 服务器已启动'))
