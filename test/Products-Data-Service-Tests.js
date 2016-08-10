var ProductsDataService = require('../data-services/products-data-service');
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
  exports.ProductTests=function(){
describe('test the ProductsDataService', function(){
  var productsDataService = new ProductsDataService(connection);

    it("getProduct should return a specific product", function(done) {
      // var categoriesDataService = new CategoriesDataService(connection);
      productsDataService.getProduct(1)
        .then(function(product) {
          assert.equal(product[0].product, "Apples - loose");
          done();

        })
        .catch(function(err) {
          done(err);
        });
  });

    it("showProduct should return the amount of products in the table", function(done) {
      // var categoriesDataService = new CategoriesDataService(connection);
      productsDataService.showProduct()
        .then(function(product) {
          assert.equal(product.length, 19);
          done();

        })
        .catch(function(err) {
          done(err);
        });
  });


    it('addProduct should add a product to the database',function(done){
      // var products = [20, "TestProduct", 3]
      var product={id:20, product:'TestProduct', category_id: 3};
      var productsDataService = new ProductsDataService(connection);

      productsDataService.addProduct(product)
      .then(function(rows){
        var test=rows.affectedRows;
        assert.equal(test,1);
        done();
      })
      .catch(function(err){
        done(err);
      });

    });

    it('updateProduct should update a product in the Database',function(done){
      var products = {

           product:"TestProducts",
           category_id:4
         };
      productsDataService.updateProduct(products,20)
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
      productsDataService.deleteProduct(20)
      .then(function(rows){
        var test=rows.affectedRows;
        assert.equal(test,1);
        done();
      })
      .catch(function(err){
        done(err);
      });

    });

    // it('searchProduct should return the product(s) matching the searchBar value', function(done){
    //   var productsDataService = new ProductsDataService(connection);
    //   var searchVal= "%" + "Bread" + "%";
    //     productsDataService.searchProduct([searchVal],function(product){
    //       // console.log(searchVal);
    //       assert.equal("Bread",product.length);
    //
    //     });
    //     done();
    // });

    it("searchProduct should return the product(s) matching the searchBar value", function(done) {
        // var categoriesDataService = new CategoriesDataService(connection);
        var searchVal = "%Bread%";
        productsDataService.searchProduct(searchVal)
        .then(function(product) {
            assert.equal(product[0].product, "Bread");
            done();
          })
          .catch(function(err) {
            done(err);
          });
    });

});

};
