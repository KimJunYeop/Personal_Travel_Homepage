var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var app = express();
var Type = require('type-of-is');
var mysql = require('mysql');
var variable = require('../variable.js');

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
  //일단 글만 수정하게 만들고 가계부로 가자.
  var sql_topic = "SELECT * FROM topic WHERE id =" + id;
  var sql_household = "SELECT * FROM household WHERE cash_id = " + id;

  connection.query(sql_topic,function(err,topics,fields){
    if(err) throw err;
    connection.query(sql_household,function(err,households,fields){
      if(err) throw err;
      variable.setValues(households);
      var values = variable.getValues();
      if(values.every(checkValues)){
        values = values.map(function(obj){
          var nArray = new Array();
          nArray.push(obj.cash_id,obj.cash_name,obj.cash_value,obj.cash_kind);
          return nArray;
        });
      };
      variable.setValues(values);
      res.render('modify',{topics:topics,households:households,id:id});
    })
  });
});


// 수정에서 가계부 수정을 누를시.
router.get('/modify/cash_modify/:id',function(req,res,next){
  var id = req.params.id;
  var values = variable.getValues();

  res.render('cash',{id : id, values : JSON.stringify(values)});
});

//array인지 check
function checkValues(values){
  if(Array.isArray(values)){
    return false;
  }else{
    return true;
  }
}

router.post('/modify/:id',function(req,res,next){
  var title = req.body.title;
  var description = req.body.description;
  var id = req.params.id;
  var values = variable.getValues();
  var big_values = new Array();


  //sintex error..
  /*var data = [['서울특별시 안ㅇ구','1'],['하우우우','2']];
  var sql = '';

  data.forEach(function(item){
    sql += mysql.format('UPDATE local SET area=? WHERE id=?;',item);
  });
  console.log(sql);

  connection.query(sql,function(err,results,fields){
    if(err) throw err;
    console.log(results);
  });*/

  var sql_topic_update = 'UPDATE topic SET title=?, description=? WHERE id=?';
  var sql_household_update='';

  console.log('post get values () !!!!!!!!!!!!!!!!!!');
  console.log(values);
  //배열에 id push.
  values.forEach(function(value,index,ar){
    value.push(Number(id));
    value.shift();
  });

  //배열합치기.
  big_values = values.reduce(function(a,b){
    return a.concat(b);
  });

  console.log('big_values==========1');
  console.log(big_values);

  values.forEach(function(item){
    sql_household_update += mysql.format('UPDATE household SET cash_name=?,cash_value=?,cash_kind=? WEHRE cash_id = ?;',item);
  });

  console.log(sql_household_update);

  /*
    topic update.
  */
  // connection.query(sql_topic_update,[title,description,id],function(err,result,fields){
  //   if(err) throw err;
  //   //if exist
  //   connection.query(sql_household_update,function(err,results,fields){
  //     console.log('sql_topics_update success!');
  //     res.redirect('/content/'+id);
  //   })
  //   //else not exist
  // });
  var test_sql = "INSERT INTO household (cash_name,cash_value,cash_kind) SELECT ?"
});


module.exports = router;
