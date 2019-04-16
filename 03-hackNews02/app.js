const http = require('http')
const fs = require('fs')
const path = require('path')
const mime = require('mime')
const template = require('art-template')
const url = require('url')
const queryString = require('querystring')

const server = http.createServer()

server.on('request', (req, res) => {
  console.log(req.url)
  res.setHeader('content-type', 'text/html;charset=utf-8')
  // res.setHeader('content-type', 'text/html;charset=utf-8')
  if (req.url.startsWith('/index') || req.url === '/') {
    fs.readFile(path.join(__dirname, 'data', 'data.json'), (err, data) => {
      if (err) {
        return console.log(err)
      }
      data = JSON.parse(data) // 将 json 数据转化Wie 对象
      let str = template(path.join(__dirname, 'views', 'index.html'), data)
      res.end(str)
    })
  } else if (req.url.startsWith('/details')) {
    // console.log(url.parse(req.url, true))

    let id = Number(url.parse(req.url, true).query.id)
    console.log(id)
    fs.readFile(path.join(__dirname, 'data', 'data.json'), (err, data) => {
      if (err) {
        return console.log(err)
      }
      data = JSON.parse(data)
      console.log(data.list)
      data = data.list.filter(item => item.id === id)[0]
      // console.log(data[0])

      let str = template(path.join(__dirname, 'views', 'details.html'), data)
      res.end(str)
    })
  } else if (req.url.startsWith('/submit')) {
    fs.readFile(
      path.join(__dirname, 'views', 'submit.html'),
      'utf-8',
      (err, data) => {
        if (err) {
          return console.log(err)
        }
        res.end(data)
      }
    )
  } else if (req.url.startsWith('/assets')) {
    res.setHeader('content-type', mime.getType(req.url))
    fs.readFile(path.join(__dirname, req.url), (err, data) => {
      if (err) {
        return console.log(err)
      }
      res.end(data)
    })
  } else if (req.url.startsWith('/add') && req.method === 'GET') {
    console.log(req.url)
    let dataObj = url.parse(req.url, true).query
    fs.readFile(
      path.join(__dirname, 'data', 'data.json'),
      'utf-8',
      (err, data) => {
        if (err) {
          return console.log(err)
        }
        console.log(data)
        data = JSON.parse(data)
        if (data.list.length > 0) {
          dataObj.id = data.list[data.list.length - 1].id + 1
        } else {
          dataObj.id = 1
        }
        data.list.push(dataObj)
        data = JSON.stringify(data, null, 2)
        fs.writeFile(path.join(__dirname, 'data', 'data.json'), data, err => {
          if (err) {
            return console.log(err)
          }
          res.statusCode = 302
          res.setHeader('location', '/index')
          // res.setHeader('location', '/index')
          res.end()
        })
      }
    )
  } else if (req.url.startsWith('/add') && req.method === 'POST') {
    let info = ''
    req.on('data', chunk => {
      info += chunk
    })
    req.on('end', () => {
      console.log(info)
      let dataObj = queryString.parse(info)
      console.log(dataObj)
      fs.readFile(
        path.join(__dirname, 'data', 'data.json'),
        'utf-8',
        (err, data) => {
          if (err) {
            return console.log(err)
          }
          data = JSON.parse(data)
          if (data.list.length > 0) {
            dataObj.id = data.list[data.list.length - 1].id + 1
          } else {
            dataObj.id = 1
          }
          data.list.push(dataObj)
          data = JSON.stringify(data, null, 2)
          fs.writeFile(
            path.join(__dirname, 'data', 'data.json'),
            data,
            'utf-8',
            err => {
              if (err) {
                return console.log(err)
              }
              res.statusCode = 302
              res.setHeader('location', '/index')
              res.end()
            }
          )
        }
      )
    })
  } else {
    res.end('404-页面未找到')
  }
})

server.listen(9999, () => console.log('http://localhost:9999 服务器已启动'))
