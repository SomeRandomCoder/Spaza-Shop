var ProductsDataService = require('../data-services/products-data-service');
var CategoriesDataService= require('../data-services/categories-data-service');
var PurchasesDataService = require("../data-services/purchases-data-service");
var SalesDataService = require("../data-services/sales-data-service");
var mysql=require('mysql');
var assert=require('assert');


var connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: "mxmaolqk",
  database: 'travis_DB'
});

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

    // it('deleteProduct should remove a product in the Database', function(done){
    //     var productsDataService = new ProductsDataService(connection);
    //     productsDataService.deleteProduct(20,function(rows) {
    //       var Deletetest= rows.changedRows;
    //       // console.log(Deletetest);
    //         assert.equal(1, Deletetest);
    //     });
    //     done();
    // });

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

  describe('test the CategoriesDataService',function(){

  it("getCategory should return a specific category", function(done){
    var categoriesDataService = new CategoriesDataService(connection);
    categoriesDataService.getCategory(1, function(err, category){
      assert.equal(category[0].category, "Bread");
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
  // it("deleteCategory should delete a row from the database", function(done){
  //   var categoriesDataService= new CategoriesDataService(connection);
  //   categoriesDataService.deleteCategory(18,function(rows){
  //     var deletedTest = rows.changedRows;
  //     assert.equal(1, deletedTest);
  //   });
  //   done();
  // });

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


// describe("test PurchasesDataService", function(){
//
//   it("getPurchase should return a specific purchase", function(done){
//     var purchasesDataService=new PurchasesDataService(connection);
//     purchasesDataService.getPurchase(5,function(purchase){
//       console.log(purchase[0].StockItem);
//       assert.equal("Coke 500ml", purchase[0]);
//     });
//     done();
//   });
//
//   it("showPurchase should return the amount of purchases in the table" , function(done){
//     var purchasesDataService = new PurchasesDataService(connection);
//     purchasesDataService.showPurchase(function(err,purchase){
//       // console.log(purchase.length);
//       assert.equal(153, purchase.length);
//     });
//     done();
//   });
//
//   it("addPurchase should add a purchase to the purchases Database table" , function(done){
//     var purchasesDataService = new PurchasesDataService(connection);
//     var purchase={
//       id: 250,
//       product_id:6,
//       StockItem: "Coke 500ml",
//       Quantity: 1,
//       Cost: 1,
//       Shop: "Spar",
//       Date: "2016-01-01"
//     };
//     purchasesDataService.addPurchase([purchase],function(rows){
//       var result=rows.affectedRows;
//       assert.equal(result,1);
//     });
//     done();
//   });

  // it("updatePurchase should update a specific purchase in the purchases Database table" , function(done){
  //   var purchasesDataService = new PurchasesDataService(connection);
  //   var purchase={
  //     id: 250,
  //     product_id:6,
  //     StockItem: "Coke 500ml",
  //     Quantity: 1,
  //     Cost: 2,
  //     Shop: "PnP",
  //     Date: "2016-01-01"
  //   };
  //   // var purchase=[180,6,"Coke 500ml",1,1,"Spar", "2016-01-01"];
  //   purchasesDataService.updatePurchase(purchase,function(rows){
  //     // console.log(purchase.length);
  //     var result=rows.affectedRows;
  //     assert.equal(result,1);
  //   });
  //   done();
  // });
  //
  // it("deletePurchase should delete a row from the Purchases Table", function(done){
  //   var purchasesDataService= new PurchasesDataService(connection);
  //   purchasesDataService.deletePurchase(250,function(rows){
  //     var deletedTest = rows.changedRows;
  //     assert.equal(1, deletedTest);
  //   });
  //   done();
  // });
  //
  // it('searchPurchase should return the product(s) matching the searchBar value', function(done){
  //   var purchasesDataService = new PurchasesDataService(connection);
  //   var searchVal= "%" + "Fruit" + "%";
  //     purchasesDataService.searchPurchase(searchVal,function(purchase){
  //       // console.log(searchVal);
  //       assert.equal("Fruit",purchase.length);
  //     });
  //     done();
  // });
// });

// describe("SalesDataServie Tests", function(){
//
//  it("getSale should get a specific sale from the Database", function(done){
//   var salesDataService = new SalesDataService(connection);
//   salesDataService.getSale(1,function(result){
//       assert.equal(result,3);
//   });
//    done();
// });
//
// });
