var PurchasesDataService = require("../data-services/purchases-data-service");
var mysql=require('mysql');
var assert=require('assert');

var connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: "mxmaolqk",
  database: 'travis_DB'
});

exports.PurchasesTest=function(){
  describe("test PurchasesDataService", function(){

    it("getPurchase should return a specific purchase", function(done){
      var purchasesDataService=new PurchasesDataService(connection);
      purchasesDataService.getPurchase(5,function(purchase){
        console.log(purchase[0].StockItem);
        assert.equal("Coke 500ml", purchase[0]);
      });
      done();
    });

    it("showPurchase should return the amount of purchases in the table" , function(done){
      var purchasesDataService = new PurchasesDataService(connection);
      purchasesDataService.showPurchase(function(err,purchase){
        // console.log(purchase.length);
        assert.equal(153, purchase.length);
      });
      done();
    });

    it("addPurchase should add a purchase to the purchases Database table" , function(done){
      var purchasesDataService = new PurchasesDataService(connection);
      // var purchase={
      //   id: 250,
      //   product_id:6,
      //   StockItem: "Coke 500ml",
      //   Quantity: 1,
      //   Cost: 1,
      //   Shop: "Spar",
      //   Date: "2016-01-01"
      // };
      var purchase=[250, 6,"Coke 500ml", 1,1,"Spar", "2016-01-01"];
      purchasesDataService.addPurchase([purchase],function(rows){
        var result=rows.affectedRows;
        assert.equal(result,1);
      });
      done();
    });

    it("updatePurchase should update a specific purchase in the purchases Database table" , function(done){
      var purchasesDataService = new PurchasesDataService(connection);
      var purchase={
        product_id:6,
        StockItem: "Coke 500ml",
        Quantity: 1,
        Cost: 2,
        Shop: "PnP",
        Date: "2016-01-01"
      };
      // var purchase=[180,6,"Coke 500ml",1,1,"Spar", "2016-01-01"];
      purchasesDataService.updatePurchase(purchase,250,function(rows){
        // console.log(purchase.length);
        var result=rows.changedRows;
        assert.equal(result,1);
      });
      done();
    });

    it("deletePurchase should delete a row from the Purchases Table", function(done){
      var purchasesDataService= new PurchasesDataService(connection);
      var id=250;
      purchasesDataService.deletePurchase([id],function(rows){
        var deletedTest = rows.changedRows;
        assert.equal(1, deletedTest);
      });
      done();
    });

    it('searchPurchase should return the product(s) matching the searchBar value', function(done){
      var purchasesDataService = new PurchasesDataService(connection);
      var searchVal= "%" + "Fruit" + "%";
        purchasesDataService.searchPurchase(searchVal,function(purchase){
          // console.log(searchVal);
          assert.equal("Fruit",purchase.length);
        });
        done();
    });
  });

};
