var weeklySale = require('./weeklySales');
var fs = require('fs');

exports.leastPopularProducts = function(week){
  var weeklySales = weeklySale.weeklySales(week);
  var leastPP =[];
  var lpp = weeklySales.sort(function(a,b){
    return a.sold-b.sold;
  });
  var leastPopularProduct = lpp[0].stockItem;
  leastPP.push(leastPopularProduct);
  // console.log(leastPP);
  return leastPP;
};



// var weeklySale = require('./weeklySales');
// var fs=require('fs');
//
// exports.mostPopularProduct = function(week) {
//   var weeklySales = weeklySale.weeklySales(week);
//   var mostPP= [];
//
// var mpp =  weeklySales.sort(function(a, b) {
//     return b.sold - a.sold;
//   });
//   var MostPopularProduct = mpp[0].stockItem;
//   mostPP.push(MostPopularProduct);
//   console.log(mostPP);
//   return mostPP;
// };
