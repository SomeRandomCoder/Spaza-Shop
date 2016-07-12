var categories = require('./Categories');
var mysql = require('mysql');
var sql= "INSERT INTO categories(Category) VALUES ?";

var connection = mysql.createConnection({
  host: '127.0.0.1',//localhost
  user: 'root',
  password: "mxmaolqk",
  database: 'nelisaDB'
});

var category = categories.Categories();
var Categories=[];
var Category=[];

connection.connect();
for(var x=0; x< category.length;x++){
Categories.push([category[x]]);
// console.log(Categories);
// Category.push([Categories[x]]);
}
connection.query(sql, [Categories], function(err){
  if (err) throw err;
  connection.end();
});
console.log("Entry into Database successful");
