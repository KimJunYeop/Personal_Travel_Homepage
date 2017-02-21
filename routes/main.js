var express = require('express');
var router = express.Router();
var app = express();

/* GET home page. */
router.get(['/','/:id'], function(req, res, next) {
  var rowsCount = "SELECT count(*) AS rowscount FROM topic";
  var pageCount;
  var limit = 8;
  var page = req.params.id;
  var offsetCount = 0;
  var length;
  //첫번째 for문 길이
  var first_for_length;
  //두번째 for문 길이
  var second_for_length;

  if(page===undefined){
    //페이지가 없다면.
    offsetCount = 0;
  }else{
    offsetCount = (page-1) * limit;
  }

  //main 바로 들어갔을때랑 page가 있을때를 나눠줘야한다.

  var sql = "SELECT * FROM topic ORDER BY id DESC LIMIT " + limit + " OFFSET " + offsetCount;
  console.log('sql :' + "SELECT * FROM topic ORDER BY date LIMIT " + limit + " OFFSET " + offsetCount);

  connection.query(rowsCount,function(err,rows,fiels){
    if(err) console.error("rowsCount Error : " + err);
    console.log('rowslength :' +  rows[0].rowscount);
    pageCount = parseInt(rows[0].rowscount/limit+1);
    connection.query(sql,function(err,topics,fields){
      if(err) console.error("sql error : " + err);
      if(topics.length<4){
        first_for_length = topics.length;
        second_for_length = 0;
      }else{
        first_for_length = 4;
        second_for_length = topics.length;
      }
      // if(topics.length<8){
      //   length = topics.length;
      // }else{
      //   length = topics.length;
      // }
      console.log(topics.length);
      res.render('main', { title: 'JunYeop' , topics : topics , pageCount : pageCount, first : first_for_length, second : second_for_length});
    });
  })
});


module.exports = router;
