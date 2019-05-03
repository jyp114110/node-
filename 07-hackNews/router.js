const express = require('express')
const fs = require('fs')
const path = require('path')
const router = express.Router()

router.get('/', (req, res) => {
  fs.readFile(path.join(__dirname, 'data', 'data.json'), (err, data) => {
    if (err) {
      return console.log(err)
    }
    let obj = JSON.parse(data)
    res.render('./index.html', obj)
  })
})

router.get('/details', (req, res) => {
  let id = req.query.id
  fs.readFile(path.join(__dirname, 'data', 'data.json'), (err, data) => {
    if (err) {
      return console.log(err)
    }
    data = JSON.parse(data)
    let obj = data.list.find(item => item.id == id)
    res.render('details.html', obj)
  })
})

router.get('/submit', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'submit.html'))
})

router.post('/add', (req, res) => {
  let info = req.body
  fs.readFile(path.join(__dirname, 'data', 'data.json'), (err, data) => {
    if (err) {
      return console.log(err)
    }
    data = JSON.parse(data)
    if (data.list.length > 0) {
      info.id = data.list[data.list.length - 1].id + 1
    } else {
      info.id = 1
    }
    data.list.push(info)
    data = JSON.stringify(data, null, 2)
    fs.writeFile(path.join(__dirname, 'data', 'data.json'), data, err => {
      if (err) {
        return console.log(err)
      }
      res.redirect('/')
    })
  })
})

module.exports = router
