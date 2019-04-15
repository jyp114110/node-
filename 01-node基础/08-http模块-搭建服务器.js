const http = require('http')
const server = http.createServer()
server.on('request', (req, res) => {
  console.log(req)
  res.end()
})

server.listen('9999', () => console.log('http://localhost:9999 服务器已启动'))
