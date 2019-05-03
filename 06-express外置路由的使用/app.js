const express = require('express')
const app = express()
const router = require('./router')
app.use(router)

app.listen(9999, () => console.log('http://localhost:9999 服务器已启动'))
