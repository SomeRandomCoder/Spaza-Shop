var SalesDataService = require("../data-services/sales-data-service");
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
exports.SalesTest=function(){


describe("SalesDataServie Tests", function(){
    var salesDataService = new SalesDataService(connection);
it("getSale should return the product_id of the first sale from the Database", function(done) {
  // var categoriesDataService = new CategoriesDataService(connection);
  salesDataService.getSale(1)
    .then(function(sale) {
      assert.equal(sale[0].product_id,3);
      done();

    })
    .catch(function(err) {
      done(err);
    });
});


it("showSale should return a specific sale from the table", function(done) {
  // var categoriesDataService = new CategoriesDataService(connection);
  salesDataService.showSale()
    .then(function(sale) {
      assert.equal(sale.length, 444);
      done();

    })
    .catch(function(err) {
      done(err);
    });
});

it('addSale should add a sale to the Sales table in the database',function(done){
  var sale={
    id: 600,
    date: "2016-01-01",
    product_id: 3,
    sold:1,
    price: 100
  };
  salesDataService.addSale(sale)
  .then(function(rows){
    var test=rows.affectedRows;
    assert.equal(test,1);
    done();
  })
  .catch(function(err){
    done(err);
  });

});


it('updateSale should update a row in the Sales table in the Database',function(done){
  var sale={
      date: "2016-01-01",
      product_id: 3,
      sold:1,
      price: 101
    };
  salesDataService.updateSale(sale,600)
  .then(function(rows){
    var test=rows.changedRows;
    assert.equal(test,1);
    done();
  })
  .catch(function(err){
    done(err);
  });
});


it('deleteSale should delete a row for the database',function(done){
  // var categoriesDataService=new CategoriesDataService(connection);
  salesDataService.deleteSale(600)
  .then(function(rows){
    var test=rows.affectedRows;
    assert.equal(test,1);
    done();
  })
  .catch(function(err){
    done(err);
  });

});

it("searchSale should return the result(s) that match the search bar value", function(done) {

    var searchVal = "%3%";
    salesDataService.searchSale(searchVal)
    .then(function(sale) {
      // console.log(sale[0].product_id);
        assert.equal(sale[0].product_id, "5");
        done();
      })
      .catch(function(err) {
        done(err);
      });
});




});
};
