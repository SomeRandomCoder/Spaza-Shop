var weeklySale = require('./weeklySales');

var weeklySales = weeklySale.weeklySales(week);
var products =[];

for(var x=0; x<weeklySales.length; x++){
  products.push(weeklySales[x].stockItem);
}
