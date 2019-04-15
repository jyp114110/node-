const http = require('http')
const fs = require('fs')
const path = require('path')
const mime = require('mime')
const template = require('art-template')

const server = http.createServer()

server.on('request', (req, res) => {
  res.setHeader('content-type', mime.getType(req.url))
  console.log(req.url)
  if (req.url.startsWith('/index') || req.url === '/') {
    fs.readFile(path.join(__dirname, 'views', 'index.html'), (err, data) => {
      if (err) {
        return console.log(err)
      }
      res.end(data)
    })
  } else if (req.url.startsWith('/details')) {
    fs.readFile(path.join(__dirname, 'views', 'details.html'), (err, data) => {
      if (err) {
        return console.log(err)
      }
      res.end(data)
    })
  } else if (req.url.startsWith('/submit')) {
    fs.readFile(path.join(__dirname, 'views', 'submit.html'), (err, data) => {
      if (err) {
        return console.log(err)
      }
      res.end(data)
    })
  } else if (req.url.startsWith('/assets')) {
    fs.readFile(path.join(__dirname, req.url), (err, data) => {
      if (err) {
        return console.log(err)
      }
      res.end(data)
    })
  } else {
    res.setHeader('content-type', 'text/html;charset=utf-8')
    res.end('404-页面不存在')
  }
})

server.listen(9999, () => console.log('http://localhost:9999 服务器已启动'))
