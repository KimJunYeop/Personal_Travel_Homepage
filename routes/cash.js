var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('cash', { title: 'JunYeop' });
});


router.post('/',function(req,res){
  var obj = {};

  var request_body = JSON.stringify(req.body);
  // console.log('body : ' + JSON.stringify(req.body));
  //obj는 Json 객체.
  obj = JSON.parse(request_body);
  // console.log(obj);
  // console.log(typeof obj);


  //obj길이
  var length = obj.grid_values_length;
  // console.log('length : ' + length);

  for(var i=0; i<length; i++){
    console.log('id : '   +   obj['grid_values['+i+'][id]']);
    console.log('name : ' +  obj['grid_values['+i+'][cash_name]']);
    console.log('kind : ' +   obj['grid_values['+i+'][cash_kind]']);

  }




  //db 에러가 여기서뜸.
  // for(var i=0; i<obj.grid_values_length; i++){
  //   data[i][0] = obj[i]['cash_name'];
  //   data[i][1] = obj[i]['cash_value'];
  //   data[i][2] = obj[i]['cash_kind'];
  //   sql +=  "INSERT INTO household(cash_name,cash_value,cash_kind) VALUES(?,?,?)"
  // }
  // connection.query(sql,data,function(error,reulst){
  //   if(!error){console.log(result)}
  //   else{
  //     console.log(error);
  //   }
  // })
});

module.exports = router;
