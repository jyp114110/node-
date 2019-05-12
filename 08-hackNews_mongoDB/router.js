const express = require('express')
// const path = rquire('path')
const mongo = require('./db')
const router = express.Router()

router.get('/', (req, res) => {
  console.log(1)
  mongo.getAllNews(data => {
    // res.render('index.html', { list: data })
    console.log(data)
    res.jsonp(data)
  })
  console.log(2)
})

router.get('/index', (req, res) => {
  console.log(3, req.url)
  res.redirect('/')
})

router.get('/details', (req, res) => {
  let id = req.query.id
  // id = objectID(id)
  mongo.getNewsById(id, data => {
    console.log(data)
    res.render('details.html', data[0])
  })
})

router.get('/submit', (req, res) => {
  res.render('submit.html')
})
router.post('/add', (req, res) => {
  let data = req.body
  console.log(data)
  mongo.addNews(data, () => {
    res.redirect('/')
  })
})
module.exports = router
