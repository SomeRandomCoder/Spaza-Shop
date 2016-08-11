var queryBuilder = require('./queryBuilder');
module.exports = function(connection){
  var QueryService = new queryBuilder(connection);

  this.getUser = function(userID) {
    return QueryService.execute("SELECT * FROM users WHERE users.id = ?",userID);
  };


  this.showUser = function(cb, err) {
    return QueryService.execute('SELECT * FROM users');
  };

  this.addUser = function(user) {
    return QueryService.execute('INSERT INTO users SET ?', [user]);
  };

  this.updateUser = function(user, userID) {
    return QueryService.execute('UPDATE users SET ? WHERE id = ?', [user,userID]);
  };

  this.deleteUser = function( userID) {
    return QueryService.execute("DELETE FROM users WHERE id = ?",[userID]);
  };

  this.searchUser = function( searchVal) {
    return QueryService.execute('SELECT * FROM users WHERE users.username LIKE  ? ', [searchVal]);
  };



//
//   this.getUser=function(UserID){
//     connection.query("SELECT * FROM users WHERE sales.id = ?",UserID,function(err, users){
//       if(err) throw err;
//       if(users.length && users >0){
//         return users[0].id;
//     }
//     });
//   };
//
//   this.showUser=function(){
//     connection.query('SELECT * FROM users', [],function(err, users) {
//       if (err) throw err;
//       if(users.length && users >0){
//
//         return users;
//       }
//     });
//   };
//
//   this.addUser= function(user){
//     connection.query('INSERT INTO users (id,username,password) VALUES ?', [user], function(err,rows){
//       if (err) console.log(err);
//       // console.log(category);
//       return  rows;
//     });
//   };
//
//   this.updateUser=function(user,UserID){
//     connection.query('UPDATE user SET ? WHERE id = ?', [UserID,user], function(err, rows){
//       if (err) throw err;
//       return rows;
//     });
//   };
//
// this.deleteUser=function(UserID){
//   connection.query("DELETE FROM users WHERE id = ?",[UserID],function(err,rows){
//     if (err) throw err;
//     return rows;
//   });
// };
//
// this.searchUser = function(searchVal){
//   connection.query('SELECT * FROM users WHERE users.id LIKE = ? ', [searchVal], function(err, result){
//     // console.log(searchVal);
//     if (err) throw err;
//     return result;
//   });
// };



};
