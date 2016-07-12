var purchase = require('./purchases');


// var express = require('express');
// var app = express();
var mysql = require('mysql');
// var myConnection = require("express-myconnection");

// var dbOptions = {
//   host: "localhost",
//   user: 'me',
//   password: "secret",
//   port: 3000,
// };

var connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: "mxmaolqk",
  database: 'nelisaDB'
});

var sql = 'INSERT INTO purchases (StockItem, Quantity, Cost, TotalAmount , Shop, Date) VALUES ?';
var sql1= "IMSERT INTO products (StockItem, Price) VALUES ?";
var stockItem = [];
var quantity =[];
var cost = [];
var date = [];
var total = [];
var shop=[];

var Purchasesvalues =[];
//============================


connection.connect();




var purchases = purchase.purchases();


for (var y=0; y< purchases.length;y++){
  stockItem.push(purchases[y].item);
  quantity.push(purchases[y].quantity);
  cost.push( purchases[y].cost);
  total.push( purchases[y].total);
  shop.push(purchases[y].shop);
  date.push(purchases[y].date);

  // console.log(purchases[x]);
Purchasesvalues.push([[stockItem[y]], [quantity[y]], [cost[y]], [total[y]], [shop[y]], [date[y]]]);
}

connection.query(sql, [Purchasesvalues], function(err){
  if (err) throw err;
  connection.end();
});
console.log("success");




// console.log(purchases[0]);
// for(var x = 0 ; x < purchases.length; x++){
//   connection.query(sql, function(err, rows, fields){
//     if(err) throw err;
//
//     // console.log('Sales are as follows:' + stockItems);
//   });
// }
