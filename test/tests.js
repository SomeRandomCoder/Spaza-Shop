var assert = require('assert');
var weeklySales = require('../functions/weeklySales');
var mostPopularProduct = require('../functions/mostPopularProduct');
var leastPopularProduct = require('../functions/leastPopularProduct');
var mostPopularCategory = require('../functions/mostPopularCategory');
var leastPopularCatergory = require('../functions/leastPopularCategory');
var mostProfitableProduct = require('../functions/mostProfitableProduct');
var mostProfitableCategory = require("../functions/mostProfitableCategory");

 describe("weeklySales", function(){
  it("should return a list of weekly products sold, quantity of each product sold and single price per item .", function(){
    var result = weeklySales.weeklySales(1);
    assert.deepEqual(result,
      [ { stockItem: 'Apples - loose', sold: 36, singlePrice: 2 }, //WEEK 1
    { stockItem: 'Bananas - loose', sold: 47, singlePrice: 2 },
    { stockItem: 'Bread', sold: 45, singlePrice: 12 },
    { stockItem: 'Chakalaka Can', sold: 23, singlePrice: 10 },
    { stockItem: 'Coke 500ml', sold: 54, singlePrice: 6.5 },
    { stockItem: 'Cream Soda 500ml', sold: 22, singlePrice: 7.5 },
    { stockItem: 'Fanta 500ml', sold: 33, singlePrice: 6.5 },
    { stockItem: 'Gold Dish Vegetable Curry Can',
      sold: 17,
      singlePrice: 9 },
    { stockItem: 'Imasi', sold: 30, singlePrice: 25 },
    { stockItem: 'Iwisa Pap 5kg', sold: 17, singlePrice: 30 },
    { stockItem: 'Milk 1l', sold: 39, singlePrice: 10 },
    { stockItem: 'Mixed Sweets 5s', sold: 49, singlePrice: 3 },
    { stockItem: 'Shampoo 1 litre', sold: 3, singlePrice: 30 },
    { stockItem: 'Soap Bar', sold: 12, singlePrice: 6 },
    { stockItem: 'Top Class Soy Mince', sold: 22, singlePrice: 12 } ],

    [ { stockItem: 'Apples - loose', sold: 0, singlePrice: 2 }, //Week2
      { stockItem: 'Bananas - loose', sold: 14, singlePrice: 2 },
      { stockItem: 'Bread', sold: 14, singlePrice: 12 },
      { stockItem: 'Chakalaka Can', sold: 0, singlePrice: 10 },
      { stockItem: 'Coke 500ml', sold: 98, singlePrice: 6.5 },
      { stockItem: 'Cream Soda 500ml', sold: 7, singlePrice: 7.5 },
      { stockItem: 'Fanta 500ml', sold: 0, singlePrice: 6.5 },
      { stockItem: 'Gold Dish Vegetable Curry Can',
        sold: 0,
        singlePrice: 9 },
      { stockItem: 'Heart Chocolates', sold: 0, singlePrice: 35 },
      { stockItem: 'Imasi', sold: 28, singlePrice: 25 },
      { stockItem: 'Iwisa Pap 5kg', sold: 7, singlePrice: 30 },
      { stockItem: 'Milk 1l', sold: 21, singlePrice: 10 },
      { stockItem: 'Mixed Sweets 5s', sold: 21, singlePrice: 3 },
      { stockItem: 'Shampoo 1 litre', sold: 0, singlePrice: 30 },
      { stockItem: 'Soap Bar', sold: 0, singlePrice: 6 },
      { stockItem: 'Top Class Soy Mince', sold: 14, singlePrice: 12 },
      { stockItem: 'Valentine Cards', sold: 42, singlePrice: 4 } ],

      [ { stockItem: 'Apples - loose', sold: 25, singlePrice: 2 }, //WEEK 3
      { stockItem: 'Bananas - loose', sold: 17, singlePrice: 2 },
      { stockItem: 'Bread', sold: 24, singlePrice: 12 },
      { stockItem: 'Chakalaka Can', sold: 17, singlePrice: 10 },
      { stockItem: 'Coke 500ml', sold: 18, singlePrice: 6.5 },
      { stockItem: 'Cream Soda 500ml', sold: 12, singlePrice: 7.5 },
      { stockItem: 'Fanta 500ml', sold: 14, singlePrice: 6.5 },
      { stockItem: 'Gold Dish Vegetable Curry Can',sold: 8,singlePrice: 9 },
      { stockItem: 'Imasi', sold: 25, singlePrice: 25 },
      { stockItem: 'Iwisa Pap 5kg', sold: 4, singlePrice: 30 },
      { stockItem: 'Milk 1l', sold: 30, singlePrice: 10 },
      { stockItem: 'Mixed Sweets 5s', sold: 29, singlePrice: 2 },
      { stockItem: 'Shampoo 1 litre', sold: 4, singlePrice: 30 },
      { stockItem: 'Soap Bar', sold: 8, singlePrice: 6 },
      { stockItem: 'Top Class Soy Mince', sold: 12, singlePrice: 12 } ],

      [ { stockItem: 'Apples - loose', sold: 7, singlePrice: 2 },
         { stockItem: 'Apples - loose', sold: 56, singlePrice: 2 },
         { stockItem: 'Bananas - loose', sold: 35, singlePrice: 2 },
         { stockItem: 'Bread', sold: 35, singlePrice: 12 },
         { stockItem: 'Chakalaka Can', sold: 21, singlePrice: 10 },
         { stockItem: 'Coke 500ml', sold: 21, singlePrice: 6.5 },
         { stockItem: 'Cream Soda 500ml', sold: 0, singlePrice: 7.5 },
         { stockItem: 'Fanta 500ml', sold: 7, singlePrice: 6.5 },
         { stockItem: 'Gold Dish Vegetable Curry Can',
           sold: 7,
           singlePrice: 9 },
         { stockItem: 'Gold Dish Vegetable Curry Can',
           sold: 63,
           singlePrice: 9 },
         { stockItem: 'Imasi', sold: 42, singlePrice: 25 },
         { stockItem: 'Iwisa Pap 5kg', sold: 21, singlePrice: 30 },
         { stockItem: 'Milk 1l', sold: 56, singlePrice: 10 },
         { stockItem: 'Mixed Sweets 5s', sold: 21, singlePrice: 3 },
         { stockItem: 'Shampoo 1 litre', sold: 0, singlePrice: 30 },
         { stockItem: 'Soap Bar', sold: 7, singlePrice: 6 },
         { stockItem: 'Top Class Soy Mince', sold: 0, singlePrice: 12 },
         { stockItem: 'Top Class Soy Mince', sold: 63, singlePrice: 12 } ]
);
  });

});

describe("mostPopularProduct",function(){
  it("should return the most popular product sold each week", function(){
    var result = mostPopularProduct.mostPopularProduct(1);
    assert.deepEqual(result, ['Coke 500ml'], ["Coke 500ml"], ["Milk 1l"], ['Gold Dish Vegetable Curry Can']);
  });
});

describe("leastPopularProduct",function(){
  it("should return the least popular product of each week",function(){
    var result = leastPopularProduct.leastPopularProducts(1);
    assert.deepEqual(result,
      ["Shampoo 1 litre"],
    ["Heart Chocolates"],
    ["Shampoo 1 litre"],
    ["Top Class Soy Mince"]
  );
  });
});

describe("popularCatergoryWeek1",function(){
  it("should return the most popular catergory for week 1", function(){
    var result=mostPopularCategory.popularCatergory(1);
    assert.equal(result, "Sweets", "Sweets", "Dairy", "Canned_Goods");
  });
});

//
describe("mostProfitableProduct",function(){
  it("should return the most profitable product of each week",function(){
    var result = mostProfitableProduct.mostProfitableProduct(1);
    assert.deepEqual(result,"Imasi","Imasi","Imasi","Imasi");
  });
});

describe("leastPopularCategory", function(){
  it("should return the least popular category for each week", function(){
    var result=leastPopularCatergory.leastPopularCatergory(1);
    assert.equal(result, "Hygiene","Canned_Goods", "Hygiene", "Meat");
  });
});
//
describe("mostProfitableCategory",function(){
  it("should return the most profitable category of each week",function(){
    var result = mostProfitableCategory.mostProfitableCategory(1);
    assert.deepEqual(result,"Dairy", "Dairy", "Dairy", "Dairy");
  });
});
