var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('cash', { title: 'JunYeop' });
});


router.post('/',function(req,res){
  var obj = {};
  var request_body = JSON.stringify(req.body);
  var sql_values = [];
  var values = [];
  // console.log('body : ' + JSON.stringify(req.body));
  //obj는 Json 객체.
  obj = JSON.parse(request_body);
  console.log(obj);
  // console.log(typeof obj);
  var sql = "INSERT INTO household(cash_id,cash_name,cash_value,cash_kind) VALUES ?";

  //obj길이
  var length = obj.grid_values_length;
  // console.log('length : ' + length);

  for(var i=0; i<length; i++){
    values.push([
      obj['grid_values['+i+'][id]'],
      obj['grid_values['+i+'][cash_name]'],
      obj['grid_values['+i+'][cash_value]'],
      obj['grid_values['+i+'][cash_kind]']
    ]);
    console.log(values);
    // console.log('id : '   +   obj['grid_values['+i+'][id]']);
    // console.log('name : ' +  obj['grid_values['+i+'][cash_name]']);
    // console.log('kind : ' +   obj['grid_values['+i+'][cash_kind]']);

    connection.query(sql,[values],function(err){
      if(err) throw err;
      res.send('1');
    });
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
