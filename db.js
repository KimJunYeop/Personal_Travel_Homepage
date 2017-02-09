var mysql = require('mysql');
connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'k357692',
  database : 'personal_travel',
  multipleStatements : true
});

module.exports = function(){
  function connect(){
    connection.connect(function(err){
      console.log('mysql connected!');
      if(err){
        console.log('error connection : ' , err.stack);
        return ;
      }
    });
  }
  connect();
  // require('./user.js');
}
