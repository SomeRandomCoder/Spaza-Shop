var fs=require('fs');

exports.Categories=function(){

var file = fs.readFileSync("../CSV/catagories.csv", "utf8");
var files = file.replace(/Product,Category\n/g, "").replace(/\n/g, ",").split(",");

category = file.replace("Product,Category\n", "");
var processingArray = category.split('\n');
var finalArray=[];

processingArray.forEach(function(string){
  var temp = string.split(",");
  finalArray.push(temp);
});
console.log(finalArray);
var categories = [];
finalArray.forEach(function(arr){
  if(categories.indexOf(arr[1])=== -1){
    categories.push(arr[1]);
  }
});
categories.pop();
// console.log(categories);
return categories;
};
