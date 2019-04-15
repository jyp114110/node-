//  根据不同的请求，返回不同的页面
// 判断 req.url ， 根据不同的url 地址，fs 模块读取对应的文件，并将其返回给浏览器进行解析
const fs = require('fs')
const path = require('path')
const http = require('http')

const server = http.createServer()
server.on('request', (req, res) => {
  res.setHeader('content-type', 'text/html;charset=utf-8')
  if (req.url.startsWith('/index')) {
    fs.readFile(
      path.join(__dirname, 'pages', '/index.html'),
      'utf-8',
      (err, data) => {
        if (err) {
          return console.log(err)
        }
        res.end(data)
      }
    )
  } else if (req.url.startsWith('/login')) {
    fs.readFile(
      path.join(__dirname, 'pages', 'login.html'),
      'utf-8',
      (err, data) => {
        if (err) {
          return console.log(err)
        }
        res.end(data)
      }
    )
  } else {
    res.end('404-页面不存在')
  }
})

server.listen(9999, () => console.log('http://localhost:9999 服务器已启动'))
