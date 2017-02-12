var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var app = express();

//이미지를 정적 파일에다가 넣어줘서 전해준다.


/* GET home page. */
router.get(['/','/:id'], function(req, res, next) {

  var id = req.params.id;
  var sql = 'SELECT * FROM topic WHERE id ='+id;
  var changeObject;

  connection.query(sql,function(err,topics,fields){
    // console.log(contents);
    // console.log(contents[0].filepath);
    // // fs.readFile(contents.filepath,function(req,res){
    // // });

    res.render('content', { topics : topics });
  });
});


module.exports = router;
