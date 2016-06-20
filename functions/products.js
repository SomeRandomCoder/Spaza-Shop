var fs=require('fs');

exports.products=function(){

var file = fs.readFileSync("../CSV/catagories.csv", "utf8");
var files = file.replace(/Product,Category\n/g, "").replace(/\n/g, ",").split(",");

category = file.replace("Product,Category\n", "");
var processingArray = category.split('\n');
var finalArray=[];

processingArray.forEach(function(string){
  var temp = string.split(",");
  finalArray.push(temp);
});
// console.log(finalArray);
var categories = [];
finalArray.forEach(function(arr){
  if(categories.indexOf(arr[0])=== -1){
    categories.push(arr[0]);
  }
});
categories.pop();
// console.log(categories);
return categories;
};
