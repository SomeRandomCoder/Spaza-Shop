var UsersDataService=require('../data-services/users-data-service');
var assert=require('assert');
var mysql=require('mysql');

// var connection = mysql.createConnection({
//   host: '127.0.0.1',
//   user: 'root',
//   password: "mxmaolqk",
//   database: 'travis_DB'
// });

exports.UserTests=function(){

describe("UsersDataService tests",function(){
  it("getUser should get a user from the database", function(done){
    var usersDataService= new UsersDataService(connection);
    usersDataService.getUser(1,function(user){
      assert.equal(users[0].user, "Nelisa1");
    });
    done();
  });

  it("showUser should show the length of the Users Table", function(done){
      var usersDataService=new UsersDataService(connection);
      usersDataService.showUser(2,function(users){
        assert.equal(3,users.length);
      });
      done();
  });

  it("addUser should add a user to the database table", function(done){
    var usersDataService=new UsersDataService(connection);
    var user =[25, "TestUser","123", ];
    usersDataService.addUser([user],function(row){
      var rows= row.affectedRows;
      assert.equal(1,rows);
    });
    done();
  });

  it("updateUser should update a specific row in the Users Table", function(done){
    var usersDataService=new UsersDataService(connection);
    var user ={

      username: "TestUser",
      password: "123",
      admin: 0,
      locked: 1
    };
    usersDataService.updateUser(user,25, function(row){
      var rows=row.affectedRows;
      assert.equal(1, rows);
    });
    done();
  });

  it("deleteUser shoudl delete a row from the Users Table in the Database", function(done){
    var usersDataService= new UsersDataService(connection);
    var id =25;
    usersDataService.deleteUser(id,function(row){
      var rows= row.changedRows;
      assert.equal(1, rows);
    });
    done();
  });

  it("searchUser should return all result(s) matching the searchVal", function(done){
    var usersDataService= new UsersDataService(connection);
    var searchVal = "%"+"Tyron"+"%";
    usersDataService.searchUser(searchVal,function(user){
      assert.equal("Tyron",user.length);
    });
    done();
  });

});
};
