var express = require('express');
var router = express.Router();


global.offset = 0;


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('first', { title: 'JunYeop' });
});


module.exports = router;
