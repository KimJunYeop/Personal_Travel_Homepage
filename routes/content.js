var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var app = express();
var Type = require('type-of-is');

//이미지를 정적 파일에다가 넣어줘서 전해준다.


/* GET home page. */
router.get(['/','/:id'], function(req, res, next) {

  var id = req.params.id;
  //sql에서 household와 topic을 join 시킨다.
  var sql_join = "SELECT topic.title,topic.description,topic.date,topic.filepath, household.cash_name,household.cash_value,household.cash_kind FROM topic INNER JOIN household ON topic.id = household.cash_id WHERE topic.id = " + id;
  var sql = "SELECT * FROM topic WHERE id = "+id;
  var changeObject;

  connection.query(sql,function(err,topics,fields){
    connection.query(sql_join,function(err,household,fields){
      res.render('content', { topics : topics, household : household });
    });
  });
});

function trim(str){
  return str.toString().replace(/"/g,"");
}


module.exports = router;
