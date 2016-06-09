var weeklySales=require('./weeklySales');
var mysql=require('mysql');
var sql = "INSERT INTO sales (StockItem, UnitPrice, AmountSold) VALUES ?";
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: "mxmaolqk",
  database: 'nelisaDB'
});

var weeklySale=weeklySales.weeklySales(1,2,3,4);
var products=[];
var unitPrice=[];
var totalAmount=[];
// var category=[];

var Sales=[];

connection.connect();
for(var x=0; x< weeklySale.length;x++){
  products.push(weeklySale[x].stockItem);
  unitPrice.push(weeklySale[x].singlePrice);
  totalAmount.push(weeklySale[x].totalAmount);

  Sales.push([ [products[x]], [unitPrice[x]],[totalAmount[x]]]);
}
connection.query(sql, [Sales], function(err){
  if (err) throw err;
  connection.end();
});
console.log("Entry successful");
