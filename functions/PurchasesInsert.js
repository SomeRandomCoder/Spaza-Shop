var purchase = require('./purchases');
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: "mxmaolqk",
  database: 'nelisaDB'
});

var sql = 'INSERT INTO purchases (product_id, Quantity, Cost, TotalCost , Shop, Date) VALUES ?';

var product_id = [];
var quantity = [];
var cost = [];
var date = [];
var total = [];
var shop = [];

var Purchasesvalues =[];
connection.connect();

connection.query('SELECT * FROM products', function(err, products) {
  if (err) return next(err);


var product_id={};

products.forEach(function(product){
  product_id[product.product] = product.id;
});

var purchases = purchase.purchases();

for (var y=0; y< purchase.length;y++){
  product_id.push(purchases[y].product_id);

  quantity.push(purchases[y].quantity);
  cost.push( purchases[y].cost);
  total.push( purchases[y].total);
  shop.push(purchases[y].shop);
  date.push(purchases[y].date);


Purchasesvalues.push([[product_id[y]], [quantity[y]], [cost[y]], [total[y]], [shop[y]], [date[y]]]);
}

connection.query(sql, [Purchasesvalues], function(err){
  if (err) throw err;
  connection.end();
});
console.log("success");
});
