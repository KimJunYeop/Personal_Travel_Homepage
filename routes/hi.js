var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('hi', { title: 'JunYeop' });
});

router.post('/',function(req,res,next){
  var title = req.body.title;
  var description = req.body.description;

  console.log(title + description);
})


module.exports = router;
