var purchase = require('./purchases');
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: "mxmaolqk",
  database: 'nelisaDB'
});

var sql = 'INSERT INTO purchases (StockItem, Quantity, Cost, TotalAmount , Shop, Date) VALUES ?';

var stockItem = [];
var quantity = [];
var cost = [];
var date = [];
var total = [];
var shop = [];

var Purchasesvalues =[];
connection.connect();
var purchases = purchase.purchases();

for (var y=0; y< purchases.length;y++){
  stockItem.push(purchases[y].item);
  quantity.push(purchases[y].quantity);
  cost.push( purchases[y].cost);
  total.push( purchases[y].total);
  shop.push(purchases[y].shop);
  date.push(purchases[y].date);

Purchasesvalues.push([[stockItem[y]], [quantity[y]], [cost[y]], [total[y]], [shop[y]], [date[y]]]);
}

connection.query(sql, [Purchasesvalues], function(err){
  if (err) throw err;
  connection.end();
});
console.log("success");
