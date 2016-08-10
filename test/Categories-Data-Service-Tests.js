var CategoriesDataService= require('../data-services/categories-data-service');
var mysql=require('mysql');
var assert=require('assert');

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

exports.CategoriesTest=function(){

  describe('test the CategoriesDataService',function(){
    var categoriesDataService = new CategoriesDataService(connection);

  it("getCategory should return a specific category", function(done) {
    // var categoriesDataService = new CategoriesDataService(connection);
    categoriesDataService.getCategory(1)
      .then(function(category) {
        assert.equal(category[0].category, "Fruit");
        done();

      })
      .catch(function(err) {
        done(err);
      });
});

  it("showCategory should return all categories", function(done) {
    // var categoriesDataService = new CategoriesDataService(connection);
    categoriesDataService.showCategory()
      .then(function(category) {
        assert.equal(category.length, 10);
        done();

      })
      .catch(function(err) {
        done(err);
      });
});

  it('addCategory shpuld add a category ti the categories table',function(done){
    var categories={id:21, category:'TestCategory'};
    categoriesDataService.addCategory(categories)
    .then(function(rows){
      var test=rows.affectedRows;
      assert.equal(test,1);
      done();
    })
    .catch(function(err){
      done(err);
    });

  });

  it('updateCategory should update a specific category in the categories table',function(done){
    var categories = {
        category:"TestCategory1"
      };
    categoriesDataService.updateCategory(categories,21)
    .then(function(rows){
      var test=rows.changedRows;
      assert.equal(test,1);
      done();
    })
    .catch(function(err){
      done(err);
    });

  });

  it('deleteCategory should delete a row from the database',function(done){
    // var categoriesDataService=new CategoriesDataService(connection);
    categoriesDataService.deleteCategory(21)
    .then(function(rows){
      var test=rows.affectedRows;
      assert.equal(test,1);
      done();
    })
    .catch(function(err){
      done(err);
    });

  });


it("searchCategory should return all categories similar to the searchValue", function(done) {
    // var categoriesDataService = new CategoriesDataService(connection);
    var searchVal = "%Fruit%";
    categoriesDataService.searchCategory(searchVal)
    .then(function(category) {
        assert.equal(category[0].category, "Fruit");
        done();
      })
      .catch(function(err) {
        done(err);
      });
});


});
};
