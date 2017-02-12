var express = require('express');
var router = express.Router();

/* GET home page. */
router.get(['/','/:id'], function(req, res, next) {
  var id = req.params.id;
  console.log('id : ' + id);

  res.render('cash', { id : id });
});


router.post('/',function(req,res){
  // last insert id
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
      obj['grid_values['+i+'][real_id]'],
      obj['grid_values['+i+'][cash_name]'],
      obj['grid_values['+i+'][cash_value]'],
      obj['grid_values['+i+'][cash_kind]']
    ]);
    console.log(values);
  }

  connection.query(sql,[values],function(err){
    if(err) throw err;
    else{
      global.offset = 1;
      res.send('1');
    }
  })
})


module.exports = router;
