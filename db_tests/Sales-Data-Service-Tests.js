var SalesDataService = require("../data-services/sales-data-service");
var mysql=require('mysql');
var assert=require('assert');

// var connection = mysql.createConnection({
//   host: '127.0.0.1',
//   user: 'root',
//   password: "mxmaolqk",
//   database: 'travis_DB'
// });
exports.SalesTest=function(connection){


describe("SalesDataServie Tests", function(){

 it("getSale should get a specific sale from the Database", function(done){
  var salesDataService = new SalesDataService(connection);
  salesDataService.getSale(1,function(result){
      assert.equal(result,3);
  });
  done();
});

it("showSale should return a specific sale from the table", function(done){
    var salesDataService= new SalesDataService(connection);
    salesDataService.showSale(1,function(sale, err){
      assert.equal(sale.length, 1);
    });
    done();
});

it("addSale should add a sale to the Sales atble in the database", function(done){
  var salesDataService= new SalesDataService(connection);
  var sale={
    id: 600,
    date: "2016-01-01",
    product_id: 3,
    sold:1,
    price: 100
  };
  salesDataService.addSale(sale,function(err,rows){
    var result= rows.affectedRows;
    assert.equal(1,result);
  });
  done();
});

it("updateSale should update a row in the Sales table in the Database", function(done){
  var salesDataService = new SalesDataService(connection);
  var sale={
    id: 600,
    date: "2016-01-01",
    product_id: 3,
    sold:1,
    price: 101
  };
  salesDataService.updateSale(sale, function(err, rows){
    var result= rows.affectedRows;
    assert.equal(1,result);
  });
  done();
});

it("deleteSale should delete a row for the database", function(done){
  var salesDataService = new SalesDataService(connection);
  salesDataService.deleteSale(600,function(row,err){
    var result= row.changedRows;
    assert.equal(1,result);
  });
  done();
});

it("searchSale should return the result(s) that match the search bar value", function(done){
    var salesDataService= new SalesDataService(connection);
    var searchVal= "%"+"Bread"+"%";
    salesDataService.searchSale(searchVal,function(sales){
      assert.equal(sales.length, "Bread");
    });
    done();
});

});
};
