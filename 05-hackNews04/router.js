const handler = require('./handler')
module.exports = function(req, res) {
  if (req.url === '/' || req.url.startsWith('/index')) {
    // 首页
    handler.showIndex(req, res)
  } else if (req.url.startsWith('/submit')) {
    handler.showSubmit(req, res)
  } else if (req.url.startsWith('/details')) {
    // 详情页
    handler.showDetails(req, res)
  } else if (req.url.startsWith('/assets')) {
    // 其他资源
    handler.showAssets(req, res)
  } else if (req.url.startsWith('/add') && req.method === 'POST') {
    // 添加
    handler.add(req, res)
  } else {
    // 404
    handler.notFound(req, res)
  }
}
