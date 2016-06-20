
var weeklySales = require("./weeklySales");
var fs = require("fs");
exports.popularCatergory = function(week){
  var weeklySales1 = weeklySales.weeklySales(week);

  var file = fs.readFileSync("./CSV/catagories.csv", "utf8");
  var files = file.replace(/Product,Category\n/g, "").replace(/\n/g, ",").split(",");

  category = file.replace("Product,Category\n", "");
  var processingArray = category.split('\n').join(".").split(',').join('.').split(".");
  var categories = [];
  for (var x = 0; x < processingArray.length - 1; x++) {
    if (x % 2 === 0) {
      var stockItem = processingArray[x];
      var categorys = processingArray[x + 1];
      // console.log(stockItem);
      categories.push({
        "stockItem": stockItem,
        "category": categorys
      });


    }
  }
  // console.log(categories);

  var popularCatergoryWeek1=[];

  for(var i =0; i< categories.length; i++){
    for(var y=0; y < weeklySales1.length;y++){
      if(weeklySales1[y].stockItem === categories[i].stockItem){
        var cat = categories[i].category;
        var soldAmount =weeklySales1[y].sold;

        popularCatergoryWeek1.push({
          category: cat,
          AmountSold: soldAmount
        });
      }
    }
  }

var PC= popularCatergoryWeek1.sort(function(a, b) {
    return b.AmountSold - a.AmountSold;
  });
  var PopularCategoryWeek1 = PC[0].category;

  // console.log(PopularCategoryWeek1);
  return PopularCategoryWeek1;

};
