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
      res.render('content', { topics : topics, household : household, id : id});
    });
  });
});



/*
  Content에서 삭제를 누를시 이곳으로 들어온다.
*/
router.get('/delete/:id',function(req,res,next){
  var id = req.params.id;
  console.log('delete id : ' + id);
  var topic_sql = "DELETE FROM topic WHERE id = " + id;
  var household_sql = "DELETE FROM household WHERE cash_id = " + id;

  connection.query(topic_sql,function(err,result,fields){
    if(err) throw err;
    console.log('deleted topic ' + result.affectedRows + ' rows');
    connection.query(household_sql,function(err,result,fields){
      console.log('deleted household ' + result.affectedRows + ' rows');
      res.redirect('/main');
    })
  })
});


/*
  Content에서 수정을 누를시 이곳으로 들어온다.
*/
router.get('/modify/:id',function(req,res,next){
  var id = req.params.id;
  console.log(id);
  //일단 글만 수정하게 만들고 가계부로 가자.
  var sql_topic = "SELECT * FROM topic WHERE id =" + id;
  var sql_household = "SELECT * FROM household WHERE cash_id = " + id;

  connection.query(sql_topic,function(err,topics,fields){
    if(err) throw err;
    connection.query(sql_household,function(err,households,fields){
      if(err) throw err;
      res.render('modify',{topics:topics,households:households,id:id});
    })
  });
});

router.post('/modify/:id',function(req,res,next){
  var title = req.body.title;
  var description = req.body.description;
  var id = req.params.id;
  console.log(id);
  var sql_update = 'UPDATE topic SET title=?, description=? WHERE id=?';
  connection.query(sql_update,[title,description,id],function(err,result,fields){
    if(err) throw err;
    res.redirect('/content/'+id);
  })
  console.log(title);
});


module.exports = router;
