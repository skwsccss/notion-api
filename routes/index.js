var express = require('express');
var router = express.Router();
var MainController = require('../controller/main');
var main = new MainController();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/test', function(req, res, next) {
  res.send('test')
});
router.get('/getPageData', main.index);

module.exports = router;
