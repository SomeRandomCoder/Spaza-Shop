var ProductTests = require("./Products-Data-Service-Tests");
var CategoriesTest = require("./Categories-Data-Service-Tests");
var PurchasesTest=require("./Purchases-Data-Service-Tests");
var SalesTest=require("./Sales-Data-Service-Tests");
var UsersTest=require('./Users-Data-Service-Tests');
var mysql=require('mysql');
var assert=require('assert');

var password = process.env.MYSQL_PWD !== undefined ? process.env.MYSQL_PWD : 'mxmaolqk';
// console.log(password);

var connection = mysql.createConnection({
  host: '127.0.0.1',
  user: process.env.MYSQL_USER ||'root',
  password: password,
  database: 'travis_DB'
});

// ProductTests.ProductTests(connection);
CategoriesTest.CategoriesTest(connection);
// PurchasesTest.PurchasesTest(connection);
// SalesTest.SalesTest(connection);
// UsersTest.UserTests(connection);
