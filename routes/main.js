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
    //rowscount = 행의 갯수
    pageCount = parseInt(rows[0].rowscount/limit+1);
    connection.query(sql,function(err,topics,fields){
      if(err) console.error("sql error : " + err);
      console.log(topics);
      res.render('main', { title: 'JunYeop' , topics : topics , pageCount : pageCount});
    });
  })
});


module.exports = router;
