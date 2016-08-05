var ProductsDataService = require('../data-services/products-data-service');
var mysql=require('mysql');
var assert=require('assert');

  // var connection = mysql.createConnection({
  //   host: '127.0.0.1',
  //   user: 'root',
  //   password: "mxmaolqk",
  //   database: 'travis_DB'
  // });
  exports.ProductTests=function(connection){
describe('test the ProductsDataService', function(){
    // Uncomment the line below and create a connection to your mysql database
    // var connection =


    it('getProduct should return a specific product', function(done){
        var productsDataService = new ProductsDataService(connection);
        productsDataService.getProduct(0, function(err, product) {
          // console.log(product);
            assert.equal('Apples - loose', product[0]);
        });
        done();
    });

    it('showProduct should return the amount of products in the table', function(done){
        var productsDataService = new ProductsDataService(connection);
        productsDataService.showProduct( function(err, product) {
          console.log(product.length);
            assert.equal(19, product.length);
        });
        done();
    });

    it('addProduct should add a product to the database', function(done){
        var productsDataService = new ProductsDataService(connection);
        var products = [20, "TestProduct", 3];
        productsDataService.addProduct([products],function(rows) {
          // console.log(Addtest);
          var Addtest= rows.affectedRows;
            assert.equal(1, Addtest);
        });
        done();
    });

    it('updateProduct should update a product in the Database', function(done){
        var productsDataService = new ProductsDataService(connection);
        var products = {
          id:20,
          product:"TestProducts",
          category_id:3
        };
        productsDataService.updateProduct(products,function(rows) {
          var Updatetest= rows.changedRows;
          // console.log(Updatetest);
            assert.equal(1, Updatetest);
        });
        done();
    });

    it('deleteProduct should remove a product in the Database', function(done){
        var productsDataService = new ProductsDataService(connection);
        productsDataService.deleteProduct(20,function(rows) {
          var Deletetest= rows.changedRows;
          // console.log(Deletetest);
            assert.equal(1, Deletetest);
        });
        done();
    });

    it('searchProduct should return the product(s) matching the searchBar value', function(done){
      var productsDataService = new ProductsDataService(connection);
      var searchVal= "%" + "Bread" + "%";
        productsDataService.searchProduct(searchVal,function(product){
          // console.log(searchVal);
          assert.equal("Bread",product.length);

        });
        done();
    });

});

};
