var express = require('express');
var router = express.Router();
var app = express();
var variable = require('../variable');
var Type = require('type-of-is');
//Type.of(ralph);                  // [Function: Person]
var path = require('path');

var moment = require('moment');
var multer = require('multer');
var _storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
var upload = multer({ storage: _storage });

var length = 0;
var last_id;



/* GET home page. */
router.get('/', function(req, res, next) {
  var last_id_sql ="SELECT AUTO_INCREMENT FROM information_schema.TABLES WHERE TABLE_SCHEMA = 'personal_travel' AND TABLE_NAME = 'topic'"
  var values = variable.getValues();
  console.log('values : ' + values);

  connection.query(last_id_sql,function(err,topics,fields){
    //topics[0].ATUO_INCREMENT 로 하면됩니다.
    res.render('write',{last_id : topics[0].AUTO_INCREMENT , values : values , length : length});
  });
});

// 가계부 등록 팝업.
router.get('/cash/:id',function(req,res,next){
  var id = req.params.id;
  var values = new Array();
  console.log('---------------------getvalues()');
  console.log(variable.getValues());
  values = JSON.stringify(variable.getValues());
  console.log(values);
  // console.log(values.replace(/&quot;/g,""));
  res.render('cash', { id : id, values : values });
});

//여기로 넣고?
//cash를 여기로 넣고 post '/'로 변수를 넘겨준다?
router.post('/household',function(req,res){
  var request_body;
  var dataArray = new Array();
  var obj = {};
  //values는 array

  request_body = JSON.stringify(req.body);
  // console.log('body : ' + JSON.stringify(req.body));
  //obj는 Json 객체.

  obj = JSON.parse(request_body);
  console.log(obj);

  for(var i=0; i<obj.length; i++){
    dataArray.push([
      obj['grid_values['+i+'][cash_id]'],
      obj['grid_values['+i+'][cash_name]'],
      obj['grid_values['+i+'][cash_value]'],
      obj['grid_values['+i+'][cash_kind]']
    ]);
  }
  variable.setValues(dataArray);
  console.log(dataArray);
});


//파일업로드.
router.post(['/','/:id'],upload.single('userfile'),function(req,res){
  var id = req.params.id;
  var title = req.body.title;
  var description = req.body.description;
  var date = moment().subtract(10, 'days').calendar();
  var values = variable.getValues();

  if(req.file){
    //아 이건좀 아닌거 같은데.. 나중에 수정. filepath에서 public을 지워야한다.
    var filepath = req.file.destination.substring(7,14) + req.file.originalname;
    console.log('file path : ' + req.file.destination);
  }else{
    console.log('empty file');
  }

  var sql = "INSERT INTO topic(title,description,date,filepath) VALUES(?,?,?,?)";
  var sql_cash = "INSERT INTO household(cash_id,cash_name,cash_value,cash_kind) VALUES ?";

  //household topics INSERT
  connection.query(sql,[title,description,date,filepath],function(err,result,fields){
    if(err){
      console.log(err);
    }
    connection.query(sql_cash,[values],function(err,results,fields){
      if(err){
        console.log(err);
      }
      variable.setClear();
      res.redirect('/main');
    })
  })
});

module.exports = router;
