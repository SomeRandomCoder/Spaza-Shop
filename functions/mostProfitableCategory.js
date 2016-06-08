var weeklySales = require("./weeklySales");
var fs = require("fs");

exports.mostProfitableCategory = function(week) {
  var weeklySales1 = weeklySales.weeklySales(week);

  var purchases = fs.readFileSync('./CSV/purchases.csv', "utf8");
  purchases = purchases.replace("Shop;Date;Item;Quantity;Cost;Total Cost", "").replace(/R/g, "");
  var processingArray = purchases.split('\n').join('.').split(";").join(".").split(".");
  // console.log(processingArray);
  var bought = [];
  for(x=0;x<processingArray.length - 1;x++){ //looping through the purchase list and making a purchase array with the item and cost
    if(x % 6 === 0){
      var date = processingArray[x - 4];
      var item = processingArray[x - 3];
      var quantity = processingArray[x-2];
      var cost = processingArray[x - 1];
      var total = processingArray[x];
      // console.log(processingArray[x]);


    bought.push({
      date: date,
      item: item,
      quantity: quantity,
      cost: cost,
      total: total
    });
  }
  }
  // console.log(bought);

  var category = fs.readFileSync('./CSV/catagories.csv', "utf8");
  category = category.replace("Product,Category\n", "");
  var processingArray2 = category.split('\n').join(".").split(',').join('.').split(".");
  var categories = [];

  for (y = 0; y < processingArray2.length - 1; y++) { //looping through the list of categories and making a category array with stock item and category
    if (y % 2 === 0) {
      var stockItem = processingArray2[y];
      var categorys = processingArray2[y + 1];
      // console.log(stockItem);
      categories.push({
        "stockItem": stockItem,
        "category": categorys
      });
      // console.log(categories);

    }
  }

  var week1 = [];
  for (x = 0; x < bought.length; x++) { //loop throught the three arrays and find the item , amount sold and profit made
    for (y = 0; y < weeklySales1.length; y++) {
      for (z = 0; z < categories.length; z++){
      if (weeklySales1[y].stockItem === bought[x].item) {
        var items = bought[x].item;
        var amountsold = weeklySales1[y].sold;
        var costs = parseFloat(bought[x].cost);
        var income = weeklySales1[y].singlePrice;
        var totalincome = income * amountsold;
        var profit = totalincome - costs;

        if (weeklySales1[y].stockItem === categories[z].stockItem){
          var category = categories[z].category;
        week1.push({item: items,
                profit: profit,
                category: category
                });
        }
      }
    }
  }
}
  var mostProfitableCategory = week1.sort(function(a, b) {
    return parseFloat(b.profit) - parseFloat(a.profit);
});

var mPC1 = mostProfitableCategory[0].category;
// console.log(mPC1);
return mPC1;
};
