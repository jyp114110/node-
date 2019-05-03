const express = require('express')
const router = express.Router()
router.get('/index', (req, res) => {
  res.send('首页')
})
router.get('/list', (req, res) => res.send('列表页'))
module.exports = router
