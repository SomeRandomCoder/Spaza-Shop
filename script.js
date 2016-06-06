var fs = require('fs');
var handlebars = require('express-handlebars');
var express = require('express');
var app = express();
var mysql = require('mysql');
var myConnection = require("express-myconnection");
var bodyParser = require('body-parser');

var weeklySales = require('./functions/weeklySales');
var mostPopularProduct = require('./functions/mostPopularProduct');
var leastPopularProduct = require('./functions/leastPopularProduct');
var mostPopularCategory = require('./functions/mostPopularCategory');
var leastPopularCategory = require('./functions/leastPopularCategory');
var mostProfitableProduct = require('./functions/mostProfitableProduct');
var mostProfitableCategory = require("./functions/mostProfitableCategory");
var categories = require("./functions/mostPopularCategory");

var stockItems = [];
var AmountSold = [];
var Total=[];
var Categories = [];

//PRODUCTS
for(var x = 0; x < categories.length; x++){
stockItems.push(categories.StockItem[x]);
Categories.push(categories.category[x]);
}

console.log(stockItems);
console.log(Categories);


var week1 = {
  mostPopularProduct: mostPopularProduct.mostPopularProduct(1),
  leastPopularProduct: leastPopularProduct.leastPopularProducts(1),
  mostPopularCategory: mostPopularCategory.popularCatergory(1),
  leastPopularCategory: leastPopularCategory.leastPopularCatergory(1),
  mostProfitableProduct: mostProfitableProduct.mostProfitableProduct(1),
  mostProfitableCategory: mostProfitableCategory.mostProfitableCategory(1)
};

var week2 = {
  mostPopularProduct: mostPopularProduct.mostPopularProduct(2),
  leastPopularProduct: leastPopularProduct.leastPopularProducts(2),
  mostPopularCategory: mostPopularCategory.popularCatergory(2),
  leastPopularCategory: leastPopularCategory.leastPopularCatergory(2),
  mostProfitableProduct: mostProfitableProduct.mostProfitableProduct(2),
  mostProfitableCategory: mostProfitableCategory.mostProfitableCategory(2)
};

var week3 = {
  mostPopularProduct: mostPopularProduct.mostPopularProduct(3),
  leastPopularProduct: leastPopularProduct.leastPopularProducts(3),
  mostPopularCategory: mostPopularCategory.popularCatergory(3),
  leastPopularCategory: leastPopularCategory.leastPopularCatergory(3),
  mostProfitableProduct: mostProfitableProduct.mostProfitableProduct(3),
  mostProfitableCategory: mostProfitableCategory.mostProfitableCategory(3)
};

var week4 = {
  mostPopularProduct: mostPopularProduct.mostPopularProduct(4),
  leastPopularProduct: leastPopularProduct.leastPopularProducts(4),
  mostPopularCategory: mostPopularCategory.popularCatergory(4),
  leastPopularCategory: leastPopularCategory.leastPopularCatergory(4),
  mostProfitableProduct: mostProfitableProduct.mostProfitableProduct(4),
  mostProfitableCategory: mostProfitableCategory.mostProfitableCategory(4)
};

app.get("/homePage", function(req, res) {
  res.render("homePage");
});

app.get("/index", function(req, res) {
  res.render("index");
});

app.get("/aboutus", function(req, res) {
  res.render("aboutus");
});

app.get("/week1", function(req, res) {
  res.render("week1", week1);
});

app.get("/week2", function(req, res) {
  res.render("week2", week2);
});

app.get("/week3", function(req, res) {
  res.render("week3", week3);
});

app.get("/week4", function(req, res) {
  res.render("week4", week4);
});


app.use(express.static("public"));

var dbOptions = {
  host: "localhost",
  user: 'me',
  password: "secret",
  port: 3000,
};

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: "mxmaolqk",
  database: 'nelisaDB'
});

connection.connect();

connection.query('SELECT * FROM sales', function(err, rows, fields){
  if(err) throw err;

  console.log('Sales are as follows:' + stockItems);
});
connection.end();


// app.use(myConnection(mysql, dbOptions, "single"));

app.engine("handlebars", handlebars({
  defaultLayout: "main"
}));
app.set("view engine", "handlebars");

var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log("app listening at http://%s:%s", host, port);
});
