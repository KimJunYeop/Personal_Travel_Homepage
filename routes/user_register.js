var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next){
  res.render('user_register');
});

router.post('/',function(req,res,next){
  var user_name = req.body.user_name;
  var user_password = req.body.pwd;
  var user_email = req.body.email;
  console.log(req.body);

  console.log(user_name,user_password,user_email);

})


module.exports = router;
