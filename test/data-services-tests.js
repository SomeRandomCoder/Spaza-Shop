var ProductTests = require("./Products-Data-Service-Tests");
var CategoriesTest = require("./Categories-Data-Service-Tests");
var PurchasesTest=require("./Purchases-Data-Service-Tests");
var SalesTest=require("./Sales-Data-Service-Tests");
var UsersTest=require('./Users-Data-Service-Tests');

var mysql=require('mysql');
var assert=require('assert');

ProductTests.ProductTests();
CategoriesTest.CategoriesTest();
PurchasesTest.PurchasesTest();
SalesTest.SalesTest();
UsersTest.UserTests();
