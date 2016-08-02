var SalesDataService = require("../data-services/sales-data-service");
var mysql=require('mysql');
var assert=require('assert');

var connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: "mxmaolqk",
  database: 'travis_DB'
});
exports.SalesTest=function(){


describe("SalesDataServie Tests", function(){

 it("getSale should get a specific sale from the Database", function(done){
  var salesDataService = new SalesDataService(connection);
  salesDataService.getSale(1,function(result){
      assert.equal(result,3);
  });
  done();
});

});
};
