module.exports = function(connection){
  this.getUser=function(UserID){
    connection.query("SELECT * FROM users WHERE sales.id = ?",UserID,function(err, users){
      if(err) throw err;
      if(users.length && users >0){
        return users[0].id;
    }
    });
  };

  this.showUser=function(){
    connection.query('SELECT * FROM users', [],function(err, users) {
      if (err) throw err;
      if(users.length && users >0){

        return users;
      }
    });
  };

  this.addUser= function(user){
    connection.query('INSERT INTO users SET ?', [user], function(err,rows){
      if (err) console.log(err);
      // console.log(category);
      return  rows;
    });
  };

  this.updateUser=function(UserID){
    connection.query('UPDATE user SET ? WHERE id = ?', [UserID], function(err, rows){
      if (err) throw err;
      return rows;
    });
  };

this.deleteUser=function(UserID){
  connection.query("DELETE FROM users WHERE id = 25",UserID,function(err,rows){
    if (err) throw err;
    return rows;
  });
};

this.searchUser = function(searchVal){
  connection.query('SELECT * FROM users WHERE users.id LIKE = ? ', [searchVal], function(err, result){
    // console.log(searchVal);
    if (err) throw err;
    return result;
  });
};



};
