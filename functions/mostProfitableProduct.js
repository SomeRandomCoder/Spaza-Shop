var weeklySale = require("./weeklySales");
var fs = require("fs");

exports.mostProfitableProduct = function(week) {
  var weeklySales1 = weeklySale.weeklySales(week);

  var purchases = fs.readFileSync('./CSV/purchases.csv', "utf8");

  purchases = purchases.replace("Shop;Date;Item;Quantity;Cost;Total Cost", "").replace(/R/g, "");
  var processingArray = purchases.split('\n').join('.').split(";").join(".").split(".");
  // console.log(processingArray);
  var bought = [];

  for(x=0;x<processingArray.length - 1;x++){
    if(x % 6 === 0){
      var item = processingArray[x - 3];
      var cost = processingArray[x];
      // console.log(processingArray[x]);
    bought.push({
      item: item,
      cost: cost
    });
  }
  }

  var week1 = [];
  for (x = 0; x < bought.length; x++) {
    for (y = 0; y < weeklySales1.length; y++) {
      if (weeklySales1[y].stockItem === bought[x].item) {
        var items = bought[x].item;
        var amountsold = weeklySales1[y].sold;
        var costs = parseFloat(bought[x].cost);
        var income = weeklySales1[y].singlePrice;
        var totalincome = income * amountsold;
        var profit = totalincome - costs;
        week1.push({item: items,
                profit: profit
                });
      }
    }
  }

  var mPP = week1.sort(function(a, b) {
    return parseFloat(b.profit) - parseFloat(a.profit);
});

var MostProfitableProduct1 = mPP[0].item;
// console.log(MostProfitableProduct1);
return MostProfitableProduct1;
};
