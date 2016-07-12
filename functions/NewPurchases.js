var fs = require('fs');
var mysql=require('mysql');
var connection = mysql.createConnection({
  host: '127.0.0.1',//localhost
  user: 'root',
  password: "mxmaolqk",
  database: 'nelisaDB'
});


// exports.purchases = function(){
  var purchase = fs.readFileSync('../CSV/purchases.csv', "utf8");
  purchase = purchase.replace("Shop;Date;Item;Quantity;Cost;Total Cost", "").replace(/R/g, "");
  var processingArray = purchase.split('\n').join('.').split(";").join(".").split(".");
  // console.log(processingArray);
  var purchases = [];

  // var products = "SELECT * FROM products";

connection.connect();
  connection.query('SELECT * FROM products', function(err, products) {

    if (err) return next(err);


  var product_id={};

  products.forEach(function(product){
    product_id[product.product] = product.id;
  });
// console.log(product_id);



  for(x=0;x<processingArray.length - 1;x++){ //looping through the purchase list and making a purchase array with the item and cost
    if(x % 6 === 0){
      var date = new Date(processingArray[x - 4] + "-2016");
      // var date = processingArray[x - 4];
      var item = processingArray[x - 3];
      var quantity = processingArray[x-2];
      var cost = processingArray[x - 1];
      var total = processingArray[x];
      var shop = processingArray[x -5];
      var productID = product_id[item];
      // console.log(processingArray[x]);

    purchases.push([productID,item,quantity,cost,shop,date]);
    console.log(purchases);
  }
  }


  purchases.shift();



// var sql = 'INSERT INTO purchases (product_id,StockItem, Quantity, Cost , Shop, Date) VALUES ?';
//   connection.query(sql, [purchases], function(err){
//     if (err) throw err;
//     connection.end();
//   });
//   console.log("Entry into the Database successful");
});
