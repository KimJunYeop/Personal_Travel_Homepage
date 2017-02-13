var express = require('express');
var router = express.Router();
var app = express();

/* GET home page. */
router.get(['/','/:id'], function(req, res, next) {

  offset = 0;
  var rowsCount = "SELECT count(*) AS rowscount FROM topic";
  var pageCount;
  var limit = 6;
  var page = req.params.id;
  console.log(page);
  if(page){
    var offsetCount = (page-1) * limit + 1;
  }else{
    page = 1;
    var offsetCount = (page-1) * limit + 1;
  }
  console.log('offsetCount : ' + offsetCount);
  //main 바로 들어갔을때랑 page가 있을때를 나눠줘야한다.

  var sql = "SELECT * FROM topic ORDER BY date LIMIT " + limit + " OFFSET " + offsetCount;
  console.log('sql :' + "SELECT * FROM topic ORDER BY date LIMIT " + limit + " OFFSET " + offsetCount);

  connection.query(rowsCount,function(err,rows,fiels){
    if(err) console.error("err : " + err);
    //rowscount = 행의 갯수
    console.log(rows[0].rowscount);
    pageCount = parseInt(rows[0].rowscount/limit + 1);

    connection.query(sql,function(err,topics,fields){
      if(err) console.error("err : " + err);
      console.log('pageCount : ' + pageCount);
      res.render('main', { title: 'JunYeop' , topics : topics , pageCount : pageCount});

    });
  })


});


module.exports = router;
