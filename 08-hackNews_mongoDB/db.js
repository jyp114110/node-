const mongodb = require('mongodb')
const monogoClient = mongodb.MongoClient
const ObjectId = mongodb.ObjectID //创建ObjectId的构造函数

let url = 'mongodb://127.0.0.1:27017'

module.exports = {
  getAllNews(callback) {
    condb(news => {
      news.find().toArray((err, data) => {
        if (err) console.log(err)
        callback && callback(data)
      })
    })
  },
  getNewsById(id, callback) {
    condb(news => {
      id = new ObjectId(id)
      news.find({ _id: id }).toArray((err, data) => {
        if (err) console.log(err)
        callback && callback(data)
      })
    })
  },
  addNews(data, callback) {
    condb(news => {
      news.insert(data)
      callback && callback()
    })
  }
}
// 链接数据库的函数
function condb(callback) {
  monogoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
    if (err) console.log('数据库链接失败', err)
    let news = client.db('news').collection('ueser')
    callback && callback(news)
    client.close()
  })
}
