const http = require('http')
const fs = require('fs')
const path = require('path')
const mime = require('mime')
const template = require('art-template')
const server = http.createServer()
const url = require('url')
const queryString = require('querystring')
server.on('request', (req, res) => {
  res.setHeader('content-type', mime.getType(req.url))
  if (req.url.startsWith('/index') || req.url === '/') {
    readData(data => {
      let str = template(path.join(__dirname, 'views', 'index.html'), data)
      res.end(str)
    })
  } else if (req.url.startsWith('/details')) {
    let id = url.parse(req.url, true).query.id

    readData(data => {
      let list = data.list
      let dataObj = list.filter(item => item.id == id)[0]
      let str = template(path.join(__dirname, 'views', 'details.html'), dataObj)
      res.end(str)
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
  } else if (req.url === '/add' && req.method === 'POST') {
    let info = ''
    req.on('data', chunk => {
      info += chunk
    })
    req.on('end', () => {
      info = queryString.parse(info)
      readData(data => {
        if (data.list.length > 0) {
          info.id = data.list[data.list.length - 1].id + 1
        } else {
          info.id = 1
        }
        data.list.push(info)
        data = JSON.stringify(data, null, 2)

        writeData(data, () => {
          res.statusCode = 302
          res.setHeader('location', '/index')
          res.end()
        })
      })
    })
  } else {
    res.setHeader('content-type', 'text/html;charset=utf-8')
    res.end('404-页面未找到')
  }
})

server.listen(9999, () => console.log('http://localhost:9999 服务器已启动'))

// 封装 读数据 的函数
function readData(callback) {
  fs.readFile(path.join(__dirname, 'data', 'data.json'), (err, data) => {
    if (err) {
      return console.log(err)
    }
    data = JSON.parse(data)
    callback && callback(data)
  })
}
// 封装 写数据的函数
function writeData(data, callback) {
  fs.writeFile(
    path.join(__dirname, 'data', 'data.json'),
    data,
    'utf-8',
    err => {
      if (err) {
        return console.log(err)
      }
      callback && callback()
    }
  )
}
