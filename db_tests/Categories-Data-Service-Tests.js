var CategoriesDataService= require('../data-services/categories-data-service');
var mysql=require('mysql');
var assert=require('assert');

// var connection = mysql.createConnection({
//   host: '127.0.0.1',
//   user: 'root',
//   password: "mxmaolqk",
//   database: 'travis_DB'
// });

exports.CategoriesTest=function(connection){

  describe('test the CategoriesDataService',function(){

  it("getCategory should return a specific category", function(done){
    var categoriesDataService = new CategoriesDataService(connection);
    categoriesDataService.getCategory(1, function(err, category){
      assert.equal(category[0].category, "Bread");
      // done();
    });
    done();

  });

  it("showCategory should return the amount of categories in the table" , function(done){
    var categoriesDataService = new CategoriesDataService(connection);
    categoriesDataService.showCategory(function(err,category){
      console.log(category.length);
      assert.equal(10, category.length);
    });
    done();
  });

    it("addCategory should add a category to the categories Table", function(done){
      var categoriesDataService = new CategoriesDataService(connection);
    var categories = [18,"TestCategory"];
    // console.log(categories);
    categoriesDataService.addCategory([categories],function(rows){
      var AddCategorytest = rows.affectedRows;
      // console.log(AddCategorytest);
      assert.equal(1,AddCategorytest);
    });
    done();
  });

    it("updateCategory should update a row in the categories table in the Database",function(done){
    var categoriesDataService= new CategoriesDataService(connection);
    var category = {
      id:18,
      category:"TestCategory1"
    };
    categoriesDataService.updateCategory(category, function(rows){
      var updatedCategory = rows.affectedRows;
      console.log(updatedCategory);
      assert.equal(1, updatedCategory);
    });
    done();
  });

  //
  it("deleteCategory should delete a row from the database", function(done){
    var categoriesDataService= new CategoriesDataService(connection);
    categoriesDataService.deleteCategory(18,function(rows){
      var deletedTest = rows.changedRows;
      assert.equal(1, deletedTest);
    });
    done();
  });

  it('searchCategory should return the product(s) matching the searchBar value', function(done){
    var categoriesDataService = new CategoriesDataService(connection);
    var searchVal= "%" + "Fruit" + "%";
      categoriesDataService.searchCategory(searchVal,function(category){
        // console.log(searchVal);
        assert.equal("Fruit",category.length);
      });
      done();
  });
});


};
