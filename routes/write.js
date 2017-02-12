var express = require('express');
var router = express.Router();
var app = express();

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



/* GET home page. */
router.get(['/','/:id'], function(req, res, next) {
  var sql = "SELECT id FROM topic ORDER BY id DESC LIMIT 1";
  var offset_1 = app.locals.offset;
  console.log('offset_1 : ' + offset_1);
  connection.query(sql,function(err,topics,fields){
    var last_id = topics[0].id + 1;
    res.render('write',{last_id : last_id});
  });
});

//파일업로드.
router.post('/',upload.single('userfile'),function(req,res){
  var title = req.body.title;
  var description = req.body.description;
  var date = moment().subtract(10, 'days').calendar();

  //다시짜야되는데.... 조건문 넣어가지구.
  //req.body가 있다면  아니면 없다면으로.
  //이것도 offset으로 하면되겠다.
  var obj = {};
  var request_body = JSON.stringify(req.body);
  var sql_values = [];
  var values = [];
  // console.log('body : ' + JSON.stringify(req.body));
  //obj는 Json 객체.
  obj = JSON.parse(request_body);
  console.log('global.offset : ' + global.offset);
  var offset = obj.offset;
  res.render('write',{offset : offset});

  console.log(obj);
  app.locals.offset = obj.offset;
  console.log('app.locals.offset : ' + app.locals.offset);


  //offset 변경
  // app.locals.offset = obj.offset;
  // console.log('app.locals.offset : ' + app.locals.offset);


  if(req.file){
    //아 이건좀 아닌거 같은데.. 나중에 수정. filepath에서 public을 지워야한다.
    var filepath = req.file.destination.substring(7,14) + req.file.originalname;
    console.log('file path : ' + req.file.destination);
  }else{
    console.log('empty file');
  }

  console.log(date);

  var sql = "INSERT INTO topic(title,description,date,filepath) VALUES(?,?,?,?)";
  connection.query(sql,[title,description,date,filepath],function(err,result,fields){
    if(err){
      console.log(err);
    }else{
      res.redirect('/write');
    }
  });
});
//이미 라우팅이 되어있다.. 시발거...

//write insert

// router.post('/',function(req,res,next){
//   var title = req.body.title;
//   res.send(title);
// });

module.exports = router;
