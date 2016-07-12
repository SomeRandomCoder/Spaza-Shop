var products=require('./products');
var mysql=require('mysql');

var sql= "INSERT INTO products (product) VALUE ?";

var connection = mysql.createConnection({
  host: '127.0.0.1',//local
  user: 'root',
  password: "mxmaolqk",
  database: 'nelisaDB'
});

var products = products.products();
var Products=[];
var Product=[];
var id =[];


connection.connect();


for(var x=0; x< products.length;x++){
Products.push(products[x]);
Product.push([Products[x]]);
}
connection.query(sql, [Product], function(err){
if(err) throw err;
connection.end();
});
console.log("Entry successful");
