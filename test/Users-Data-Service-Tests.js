var UsersDataService=require('../data-services/users-data-service');
var assert=require('assert');
var mysql=require('mysql');

// var connection = mysql.createConnection({
//   host: '127.0.0.1',
//   user: 'root',
//   password: "mxmaolqk",
//   database: 'travis_DB'
// });

var password = process.env.MYSQL_PWD !== undefined ? process.env.MYSQL_PWD : 'mxmaolqk';
// console.log(password);

var connection = mysql.createConnection({
  host: '127.0.0.1',
  user: process.env.MYSQL_USER ||'root',
  password: password,
  database: 'travis_DB'
});

exports.UserTests=function(){

describe("UsersDataService tests",function(){
  var userDataService = new UsersDataService(connection);


  it("getUser should get a user from the database", function(done) {
    // var categoriesDataService = new CategoriesDataService(connection);
    userDataService.getUser(16)
      .then(function(user) {
        assert.equal(user[0].username,"Nelisa1");
        done();

      })
      .catch(function(err) {
        done(err);
      });
  });

  it("showUser should show the length of the Users Table", function(done) {
    // var categoriesDataService = new CategoriesDataService(connection);
    userDataService.showUser()
      .then(function(users) {
        assert.equal(users.length, 2);
        done();

      })
      .catch(function(err) {
        done(err);
      });
  });

  it('addUser should add a user to the database table',function(done){

    var user ={id:25, username: "TestUser",password:"123"};
    userDataService.addUser(user)
    .then(function(rows){
      var test=rows.affectedRows;
      assert.equal(test,1);
      done();
    })
    .catch(function(err){
      done(err);
    });

  });


  it('updateUser should update a specific row in the Users Table',function(done){
    var user ={

      username: "TestUser",
      password: "123",
      admin: 0,
      locked: 1
    };
    userDataService.updateUser(user,25)
    .then(function(rows){
      var test=rows.changedRows;
      assert.equal(test,1);
      done();
    })
    .catch(function(err){
      done(err);
    });
  });

  it('deleteUser should delete a row from the Users Table in the Database',function(done){
    // var categoriesDataService=new CategoriesDataService(connection);
    userDataService.deleteUser(25)
    .then(function(rows){
      var test=rows.affectedRows;
      assert.equal(test,1);
      done();
    })
    .catch(function(err){
      done(err);
    });

  });

  it("searchUser should return all result(s) matching the searchVal", function(done) {
      // var categoriesDataService = new CategoriesDataService(connection);
      var searchVal = "%Nelisa1%";
     userDataService.searchUser(searchVal)
      .then(function(user) {
          assert.equal(user[0].username, "Nelisa1");
          done();
        })
        .catch(function(err) {
          done(err);
        });
  });

});
};
