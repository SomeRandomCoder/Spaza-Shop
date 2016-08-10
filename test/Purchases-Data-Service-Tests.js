var PurchasesDataService = require("../data-services/purchases-data-service");
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

exports.PurchasesTest=function(){
  describe("test PurchasesDataService", function(){
      var purchasesDataService=new PurchasesDataService(connection);

    it("getPurchase should return a specific purchase", function(done) {
      // var categoriesDataService = new CategoriesDataService(connection);
      purchasesDataService.getPurchase(5)
        .then(function(purchase) {
          assert.equal(purchase[0].StockItem, "Gold Dish Vegetable Curry Can");
          done();

        })
        .catch(function(err) {
          done(err);
        });
  });
    it("showPurchase should return the amount of purchases in the table", function(done) {
      // var categoriesDataService = new CategoriesDataService(connection);
      purchasesDataService.showPurchase()
        .then(function(purchase) {
          assert.equal(purchase.length, 152);
          done();

        })
        .catch(function(err) {
          done(err);
        });
  });

    it('addPurchase should add a purchase to the purchases Database table',function(done){

      var purchase={
        id: 250,
        product_id:6,
        StockItem: "Coke 500ml",
        Quantity: 1,
        Cost: 1,
        Shop: "Spar",
        Date: "2016-01-01"
      };
      purchasesDataService.addPurchase(purchase)
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
      var purchasesDataService= new PurchasesDataService(connection);

      var purchase={
        product_id:6,
        StockItem: "Coke 500ml",
        Quantity: 1,
        Cost: 2,
        Shop: "PnP",
        Date: "2016-01-01"
      };
      purchasesDataService.updatePurchase(purchase,250)
      .then(function(rows){
        var test=rows.changedRows;
        assert.equal(test,1);
        done();
      })
      .catch(function(err){
        done(err);
      });

    });

    it('deletePurchase should delete a row from the Purchases Table',function(done){
      // var categoriesDataService=new CategoriesDataService(connection);
      purchasesDataService.deletePurchase(250)
      .then(function(rows){
        var test=rows.affectedRows;
        assert.equal(test,1);
        done();
      })
      .catch(function(err){
        done(err);
      });

    });

  //   it('searchPurchase should return the product(s) matching the searchBar value', function(done){
  //     var purchasesDataService = new PurchasesDataService(connection);
  //     var searchVal= "%" + "Fruit" + "%";
  //       purchasesDataService.searchPurchase(searchVal,function(purchase){
  //         // console.log(searchVal);
  //         assert.equal("Fruit",purchase.length);
  //       });
  //       done();
  //   });
  // });

  it("searchPurchase should return the product(s) matching the searchBar value", function(done) {
      // var categoriesDataService = new CategoriesDataService(connection);
      var searchVal = "%Bread%";
      purchasesDataService.searchPurchase(searchVal)
      .then(function(purchase) {
          assert.equal(purchase[0].StockItem, "Bread");
          done();
        })
        .catch(function(err) {
          done(err);
        });
  });

});
};
