exports.weeklySales = function(week) {
  var fs = require('fs'); //file system

  var sales = fs.readFileSync("./CSV/week" + week + ".csv", "utf8");
  sales = sales.replace("Day,Date,stock item,No sold,Sales Price\n", "");

  var ItemsArray = sales.replace(/R/g, "").split('\n');

  var weekArray = [];
  for (i = 0; i < ItemsArray.length - 1; i++) {
    weekArray.push(ItemsArray[i].split(","));
  }
  var salesList = [];
  weekArray.forEach(function(index) {
    salesList.push([index[2], Number(index[3]), Number(index[4])]);
  });
  salesList.sort();

  var weeklySales = [];


  for (i = 0; i < salesList.length; i++) {
    if (i % 7 === 0) {
      var stockItem = salesList[i][0];
      var sold = 0;
      var singlePrice = Number(salesList[i][2]);

      if (week % 2 !== 0) {
        for (j = 0; j < 7; j++) {
          sold += salesList[i + j][1];
        }
      } else {
        sold += salesList[i][1];
      }
      var totalAmount= singlePrice*sold;

      weeklySales.push({
        "stockItem": stockItem,
        "sold": sold,
        "singlePrice": Number(singlePrice),
        totalAmount: totalAmount

      });
    }
  }
  // console.log(weeklySales);
  return weeklySales;
};
