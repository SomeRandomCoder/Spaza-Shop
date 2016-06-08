var fs = require('fs');

exports.purchases = function(){
  var purchases = fs.readFileSync('../CSV/purchases.csv', "utf8");
  purchases = purchases.replace("Shop;Date;Item;Quantity;Cost;Total Cost", "").replace(/R/g, "");
  var processingArray = purchases.split('\n').join('.').split(";").join(".").split(".");
  // console.log(processingArray);
  var purchases = [];
  for(x=0;x<processingArray.length - 1;x++){ //looping through the purchase list and making a purchase array with the item and cost
    if(x % 6 === 0){
      var date = processingArray[x - 4];
      var item = processingArray[x - 3];
      var quantity = processingArray[x-2];
      var cost = processingArray[x - 1];
      var total = processingArray[x];
      // console.log(processingArray[x]);


    purchases.push({
      date: date,
      item: item,
      quantity: quantity,
      cost: cost,
      total: total
    });
  }
  }
  purchases.shift();
  // console.log(purchases);
  return purchases;
};
