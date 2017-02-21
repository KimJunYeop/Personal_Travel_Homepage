var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('cash_write', { title: 'JunYeop' });
});


module.exports = router;
