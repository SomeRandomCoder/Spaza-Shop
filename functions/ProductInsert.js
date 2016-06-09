var weeklySale = require('./weeklySales');
var mysql = require('mysql');


var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: "mxmaolqk",
  database: 'nelisaDB'
});

var weeklySales=weeklySale.weeklySales(2);
var sql = "INSERT INTO products (StockItem) VALUE ?";
var product=[];
var products=[];
var category=[];

connection.connect();

  for(var x=0; x< weeklySales.length;x++){
    product.push(weeklySales[x].stockItem);
    products.push([[product[x]]]);
  }

connection.query(sql, [products], function(err){
if(err) throw err;
connection.end();
});
console.log("Entry successful");
