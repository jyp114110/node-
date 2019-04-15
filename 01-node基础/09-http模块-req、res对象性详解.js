const http = require('http')
const server = http.createServer()
server.on('request', (req, res) => {
  // request 处理请求报文
  console.log(req.url)
  console.log(req.method)

  // response 处理响应报文
  res.statusCode = '404' // 状态码
  res.setHeader('content-type', 'text/html;charset=utf-8')
  res.end('响应结束')
})

server.listen('9999', () => {
  console.log('http://localhost:9999 服务器已启动')
})
