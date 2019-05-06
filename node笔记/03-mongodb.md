# mongodb

数据库的分类

关系型数据库；mysql oracle sql server db2

非关系数据库:  mongodb  redis  memcache

## MongoDB简介

- [mongodb 官网](https://www.mongodb.com/)
- [mongodb 中文](https://www.mongodb.com/cn)
- [mongodb教程](http://www.runoob.com/mongodb/mongodb-tutorial.html)
- MongoDB 是一个非关系型数据库，属于文档型数据库（NoSQL -> Not Only SQL）
- 对 JavaScript 兼容较好，和 Node.js 结合最好 
- MEAN: `M:mongodb E:express  A:angular(vue react) n:nodejs`

## mongodb安装

### windows版本

参考地址：

http://www.runoob.com/mongodb/mongodb-window-install.html

- 1 根据操作系统选择合适的安装程序（32位或64位）
- 2 直接安装程序
- 3 配置环境变量，通过命令：`mongod --version`看是否安装成功
- 4 注意：**MongoDB最新版的安装包已经不再支持32位的windows操作系统了**

```html
解决mongodb安装时出错 “mongodb 无法启动此程序，因为计算机中丢失 api-ms-win-crt-runtime-l1-1-0.dll”，安装 vc_redist.x64.exe

https://helpx.adobe.com/tw/creative-cloud/kb/error_on_launch.html

通过指定其他电脑的ip地址，就可以使用其他电脑中的MongoDB数据库了：
var url = 'mongodb://localhost:27017'  
```

### mac版本

参考地址：http://www.runoob.com/mongodb/mongodb-osx-install.html

## mongodb启动与连接

- 1 通过命令：`mongod` 启动 mongodb数据库服务（不要关闭）
- 2 重新开启一个cmd，输入命令：`mongo` 就可以连接到mongod服务了

```html
1 在 C中创建 data文件夹, 在data文件夹中创建 db文件夹
2 在终端中输入命令: mongod ,就可以启动mongodb数据库服务了

3. 创建 c:\data\db 的目的: 告诉 mongodb 数据存储到这个文件夹中, 但是, 只能在C盘中启动 mongod
4. 如果需要在 D盘 启动, 需要在 D中也创建 data/db 目录

```

```bash
# 终端1 -- 启动服务
mongod

# 终端2 -- 连接到服务
# 此时，就可以在 终端 对数据库进行操作了
mongo
# 或者 指定ip
mongo mongodb://localhost:27017
```

### 数据库存储路径的说明

- [windows32位系统 安装MongoDB](https://www.cnblogs.com/myzy/p/7826540.html)
- 注意：mongod 会在执行命令的磁盘根目录中查找 `data/db` 目录作为数据库文件存储路径
- 可以通过命令：`mongod --dbpath 路径` 修改默认配置

```bash
# 64位：
mongod --dbpath C:\data\db

# 32位：
mongod  --journal --storageEngine=mmapv1
mongod --dbpath c:\data\db --journal --storageEngine=mmapv1
```

## MongoDB终端操作

## 数据库操作

> 以下的命令都是在mongo终端下完成

- 查看数据库

```bash
# 注意：自己创建的数据库，如果数据为空，不会显示
show dbs
```

- 切换(创建)数据库

```bash
# 如果数据库存在，切换到该数据库， 如果数据库不存在，创建新的数据库
# 如果数据库里面没有数据的话，数据库不显示
use 数据库名
use test
use users
```

- 查看当前使用的数据库

```bash
# 查看当前正在使用的数据库
db
```

- 删除当前数据库

```bash
db.dropDatabase()
```

### mongodb术语

- 数据库：一个项目会使用一个数据库，比如letao, baixiu等
- 集合：类似于表，一个数据库可以有很多集合，比如user存放学生信息，teacher存放老师的信息
- 文档：一条数据就是一个文档，一个集合可以存放多条数据，即一个集合可以存放多个老师的信息，每个老师的信息称为一条文档
- 字段：一条数据中的属性，就是字段，比如name，age等

| SQL术语/概念 | MongoDB术语/概念 | 解释/说明                           |
| ------------ | ---------------- | ----------------------------------- |
| database     | database         | 数据库                              |
| table        | collection       | 数据库表/集合                       |
| row          | document         | 数据记录行/文档                     |
| column       | field            | 数据字段/域                         |
| index        | index            | 索引                                |
| table joins  |                  | 表连接,MongoDB不支持                |
| primary key  | primary key      | 主键,MongoDB自动将_id字段设置为主键 |

### 插入数据（文档）

- 语法：`db.集合名称.insert({})`
- 说明: 在 mongodb 中不需要提前创建"表", 直接通过 db.表名称.inseret() 就可以往表中添加数据了

```js
// 插入一条
db.users.insert({name: 'jack', age: 18, gender: 'male'})

// 插入多条
db.users.insertMany([{name: 'tom', age: 19}, {name: 'jerry', age: 20}])
```

### 查询数据

- 语法：`db.集合名称.find()`

```js
// 查询所有数据
db.users.find()

// 指定条件查询：
db.集合名称.find({name: 'jack'})
```

### 修改数据

- 语法：`db.集合名称.updateOne(条件, 更新后的数据)`

```js
// 修改name属性为jack的数据，将age改为20
// 第一个参数: 表示要修改哪个数据, 会根据指定的name属性, 去查找值为jack的数据
// 第二个参数: 表示修改修改后的数据, 会修改 age 属性的值为 20
db.users.updateOne({name: 'jack'}, {$set: {age: 20}})

// 修改age大于19岁的文档，将name设置为 中年人
db.users.updateMany({age: {$gt: 19}},{$set: {name: '中年人'}})
```

### 删除数据

- 语法：`db.集合名称.deleteOne(条件)`

```js
// 删除 age 为18的数据：
// 参数: 删除条件
db.users.deleteOne({age: 18})

// 删除所有name为jack的文档
db.users.deleteMany({ name: 'jack' })
```

### MondoDB 查询语句

| 操作       | 格式 |                           示例 |             SQL语句 |
| ---------- | :--: | -----------------------------: | ------------------: |
| 等于       |  {}  |   db.col.find({ name :'jack'}) | where name = 'jack' |
| 小于       | $lt  |  db.col.find({ age: {$lt:18}}) |      where age < 18 |
| 小于或等于 | $lte | db.col.find({ age: {$lte:18}}) |     where age <= 18 |
| 大于       | $gt  |  db.col.find({ age: {$gt:18}}) |      where age > 18 |
| 大于或等于 | $gte | db.col.find({ age: {$gte:18}}) |     where age >= 18 |
| 不等于     | $ne  |  db.col.find({ age: {$ne:18}}) |     where age != 18 |

less  than  equal  great  not 

## 在 node 中操作 MongoDB

- 安装：`npm i  mongodb`

```js
// 导入 mongodb，并获取到客户端对象
var MongoClient = require('mongodb').MongoClient

// 连接数据库服务地址
var url = 'mongodb://localhost:27017'

// 连接数据库
MongoClient.connect(url, function (err, client) {
  if (err) {
    return console.log('链接数据库失败', err)
  }

  console.log('数据库链接成功');

  // 获取集合对象
  var db = client.db('nodedb')

  // 关闭数据库链接
  client.close()
})
```

### 数据增删改查

- 添加数据：

```js
var db = client.db('nodedb')

// 添加
db.collection('users')
  // 添加一条数据
  .insert({name: 'rose', age: 19}, function (err, data) {
    console.log(data);
  })
  // 添加多条数据
  .insertMany([{ name: 'tom', age: 20 }, { name: 'jerry', age: 21 }], function (err, data) {
    console.log(data);
  })
```

- 查询数据：

```js
var db = client.db('nodedb')

// 查询
db.collection('users').find().toArray(function (err, data) {
  console.log(data)
})
```

- 删除数据:

```js
var db = client.db('nodedb')

db.collection('users')
  // 删除一条数据：
  .deleteOne({name: 'rose'}, function (err, result) {
    console.log(result);
  })
  // 删除多条数据：
  .deleteMany({age: {$lt: 20}}, function (err, result) {
    console.log(result);
  })
```

- 修改数据：

```js
var db = client.db('nodedb')

db.collection('users')
  .update({ name: 'tom' }, { $set: { age: 22 } }, function (err, result) {
    console.log(result);
  })
```

## 使用MongoDB实现 hacker-news



## 在 node 中操作 MongoDB

- 安装：`npm i  mongodb`
- 启动mongodb的服务

```js
// 导入 mongodb，并获取到客户端对象
var MongoClient = require('mongodb').MongoClient

// 连接数据库服务地址
var url = 'mongodb://localhost:27017'

// 连接数据库
MongoClient.connect(url, function (err, client) {
  if (err) {
    return console.log('链接数据库失败', err)
  }

  console.log('数据库链接成功');

  // 获取集合对象
  var db = client.db('nodedb')

  // 关闭数据库链接
  client.close()
})
```

## 数据增删改查

+ 查询数据

```javascript
//查询
db
    .collection("users")
    .find({age: {$gt:20}})
    .toArray(function(err, data){
    if(err) {
        return console.log("获取数据失败");
    }
    console.log(data);
});


  db.collection("user").findOne({name:"小鲜肉"}, function(err, result){
    if(err) {
      console.log("查询单个数据失败了");
      return;
    }
    console.log(result);
  })
```

- 添加数据：

```js
//添加单条
db
    .collection("users")
    .insertOne({name:"jim1", age: 12, gender:"女"}, function(err, info){
    if(info.result.ok === 1){}
    console.log("数据插入成功");
});

//添加多条数据
db
    .collection("users")
    .insertMany([ {"name":"cc", "age":18, gender:"男"}, {"name":"cc", "age":17, gender:"女"} ], function(err, info){
    console.log(info.result);
});
```

- 删除数据:

```js
//删除单条数据
db
    .collection("users")
    .deleteOne({age: {$gt:5}}, function(err, info){
    if(info.result.ok === 1) {
        console.log("数据删除成功");
    }
})

//删除多条数据
db
    .collection("users")
    .deleteMany({age: {$gt:5}}, function(err, info){
    if(info.result.ok === 1) {
        console.log("数据删除成功");
    }
})
```

- 修改数据：

```js
//修改单条数据
db
    .collection("users")
    .updateOne({name: "tom"}, {$set: {gender:"女"}}, function(err, info){
    if(info.result.ok === 1) {
        console.log("数据修改成功了");
    }
})

//修改多条数据
db
    .collection("users")
    .updateMany({ name: "tom" }, { $set: { gender: "不详" } }, function (err, info) {
    if (info.result.ok === 1) {
        console.log("数据修改成功了");
    }
})
```

## 使用MongoDB实现 hacker-news

# 前后端分离的HackerNews

## 服务端渲染

服务端准备数据，服务端进行数据的渲染。

前端仅仅是提供了页面。

## 前端渲染（前后端分离）

服务端提供数据和接口

前端通过ajax请求数据，获取数据，结合模版引擎进行渲染。