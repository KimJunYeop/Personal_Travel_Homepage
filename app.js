var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var db = require('./db.js');
var variable = require('./variable.js');

//routes
var first = require('./routes/first');
var main = require('./routes/main');
var write = require('./routes/write');
var content = require('./routes/content');
var cash_write = require('./routes/cash_write');
var hi = require('./routes/hi');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//main routing에서도 path를 public에서 사용하도록 한다.
app.use('/main',express.static(path.join(__dirname,'public')));
app.use('/content',express.static(path.join(__dirname,'public')));
app.use('/cash',express.static(path.join(__dirname,'public')));

app.use('/first', first);
app.use('/main',main);
app.use('/write',write);
app.use('/content',content);
app.use('/cash',write);
app.use('/cash_write',cash_write);
app.use('/hi',hi);
app.use('/cash',content);


db();


//전역변수

// 입력하지마라... 죽인다 진짜... error 메세지 다음에 입력하면 입력되지 않는다.
// 아니 비절차적 언어 아니야? 절차적언어야?
// 어? 무슨 C언어야? 시발거...
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
