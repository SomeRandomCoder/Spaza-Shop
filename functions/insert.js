var purchase = require('./purchases');

// exports.bulkInsert=function(){
  // alert(bought);
var purchases = purchase.purchases();
// console.log(purchases[0]);
  for(var x = 0 ; x < purchases.length; x++){

    console.log(purchases[x].date);
  }

// };
