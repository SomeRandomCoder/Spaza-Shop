var fs = require('fs');
var handlebars = require('express-handlebars');
var express = require('express');
var app = express();
var mysql = require('mysql');
var myConnection = require("express-myconnection");
var bodyParser = require('body-parser');
var session = require("express-session");
var bcrypt=require("bcrypt");
var flash=require('express-flash');


var weeklySales = require('./functions/weeklySales');
var mostPopularProduct = require('./functions/mostPopularProduct');
var leastPopularProduct = require('./functions/leastPopularProduct');
var mostPopularCategory = require('./functions/mostPopularCategory');
var leastPopularCategory = require('./functions/leastPopularCategory');
var mostProfitableProduct = require('./functions/mostProfitableProduct');
var mostProfitableCategory = require("./functions/mostProfitableCategory");
var categories = require("./functions/mostPopularCategory");
var bought = require("./functions/mostProfitableCategory");
var categoriesCRUD=require('./functions/categoriesCRUD');
var productsCRUD=require("./functions/productsCRUD");
var salesCRUD=require("./functions/salesCRUD");
var purchaseCRUD=require("./functions/purchasesCRUD");
var signup=require("./functions/signup");
var usersCRUD=require("./functions/users");
var login=require("./functions/login");

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(bodyParser.json());

app.use(express.static("public"));

var dbOptions = {
  host: "localhost",
  user: 'root',
  password: "mxmaolqk",
  port: 3306,
  database: 'nelisaDB'
};

app.use(myConnection(mysql, dbOptions, "single"));

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: "mxmaolqk",
  database: 'nelisaDB'

});

var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log("app listening at http://%s:%s", host, port);
});


app.engine("handlebars", handlebars({
  defaultLayout: "main"
}));
app.set("view engine", "handlebars");

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: false
}));

  var week1 = {
    mostPopularProduct: mostPopularProduct.mostPopularProduct(1),
    leastPopularProduct: leastPopularProduct.leastPopularProducts(1),
    mostPopularCategory: mostPopularCategory.popularCatergory(1),
    leastPopularCategory: leastPopularCategory.leastPopularCatergory(1),
    mostProfitableProduct: mostProfitableProduct.mostProfitableProduct(1),
    mostProfitableCategory: mostProfitableCategory.mostProfitableCategory(1),
    title: "Week 1"
  };

var week2 = {

  mostPopularProduct: mostPopularProduct.mostPopularProduct(2),
  leastPopularProduct: leastPopularProduct.leastPopularProducts(2),
  mostPopularCategory: mostPopularCategory.popularCatergory(2),
  leastPopularCategory: leastPopularCategory.leastPopularCatergory(2),
  mostProfitableProduct: mostProfitableProduct.mostProfitableProduct(2),
  mostProfitableCategory: mostProfitableCategory.mostProfitableCategory(2),
  title: "Week 2"
};

var week3 = {
  mostPopularProduct: mostPopularProduct.mostPopularProduct(3),
  leastPopularProduct: leastPopularProduct.leastPopularProducts(3),
  mostPopularCategory: mostPopularCategory.popularCatergory(3),
  leastPopularCategory: leastPopularCategory.leastPopularCatergory(3),
  mostProfitableProduct: mostProfitableProduct.mostProfitableProduct(3),
  mostProfitableCategory: mostProfitableCategory.mostProfitableCategory(3),
  title: "Week 3"
};

var week4 = {
  mostPopularProduct: mostPopularProduct.mostPopularProduct(4),
  leastPopularProduct: leastPopularProduct.leastPopularProducts(4),
  mostPopularCategory: mostPopularCategory.popularCatergory(4),
  leastPopularCategory: leastPopularCategory.leastPopularCatergory(4),
  mostProfitableProduct: mostProfitableProduct.mostProfitableProduct(4),
  mostProfitableCategory: mostProfitableCategory.mostProfitableCategory(4),
  title: "Week 4"
};

// app.use(function(req,res,next){
//   if(req.path != "/login"){
//     if(req.path != "/signup"){
//       if(!req.session.username){
//         return res.redirect("/login");
//       }
//     }
//   }
//     next();
// });
//
// app.use(function(req,res,next){
//   if(!req.session.admin){
//     if(req.path == "/sales"){
//       res.redirect("/");
//     }
//   }
// next();
// });

app.use(function(req,res,next){
  var isAdmin = req.session.admin && req.session.username,
      isUser = !req.session.admin && req.session.username,
      anyUser = req.session.username,
      pathIsLogin = req.path === "/login",
      pathIsSignUp = req.path === "/signup";
console.log("IS ADMIN", isAdmin);
console.log("IS USER", isUser);
console.log("IS NOT ANY USER", !anyUser);
console.log("PATH IS LOGIN", pathIsLogin);
console.log("PATH IS SIGN UP", pathIsSignUp);
console.log("USING AUTHENTICATION METHOD");
console.log("THIS IS REQ.PATH", req.path);
console.log("THIS IS REQ.PATH.SPLIT", req.path.split("/")[1]);

  var generalPath = req.path.split("/")[1] === "login"
              || req.path.split("/")[1] === "signup"
              || req.path === "/";

  var adminPath = req.path.split("/")[1] === "products"
               || req.path.split("/")[1] === "categories"
               || req.path.split("/")[1] === "sales"
               || req.path.split("/")[1] === "purchases"
               || req.path.split("/")[1] === "users";

  if (!anyUser) {
    console.log("USER NOT SIGNED UP OR LOGGED IN REDIRECTING TO SIGNUP/LOGIN");
      res.redirect("/signup");
  } else if (isUser && generalPath) {
    console.log("IS USER AND GENERAL PATH MOVING ON TO NEXT MIDDLEWARE");
    next();
  } else if (isUser && adminPath) {
    console.log("IS USER BUT ATTEMPTING TO GO TO ADMIN PATH REDIRECTING PATH TO '/'");
    res.redirect("/");
  } else if (isAdmin && (adminPath || generalPath)) {
    console.log("IS ADMIN AND PATH IS ADMIN OR GENERAL. MOVING ON TO NEXT MIDDLEWARE");
    next();
  }

});

app.get("/signup", function(req, res, next){
  console.log("DIRECTED TO SIGNUP ROUTE");
  req.getConnection(function(err, connection){
    // connection = mysql.createConnection(dbOptions);
    if(err) return next(err);
    console.log("RENDERING SIGNUP PAGE");
    res.render("signup");
  });
});

app.post('/signup', signup);

app.get("/login", function(req, res, next){
  console.log("DIRECTED TO LOG IN ROUTE");
  req.getConnection(function(err, connection){
    // connection = mysql.createConnection(dbOptions);
    if(err) return next(err);
    console.log("RENDERING LOG IN PAGE ");
    res.render("login");
  });
});
app.post('/login', login);

app.get('/logout', function(req, res) {
    delete req.session.user;
    delete req.session.admin;
    res.redirect('/login');
});


app.get("/", function(req, res) {
  res.render("homePage");
});

app.get("/aboutus", function(req, res) {
  res.render("aboutus");
});

app.get("/index", function(req, res) {
  res.render("index");
});

app.get("/week1", function(req, res) {
  res.render("week1", week1);
});

app.get("/week2", function(req, res) {
  res.render("week2", week2);
});

app.get("/week3", function(req, res) {
  res.render("week3", week3);
});

app.get("/week4", function(req, res) {
  res.render("week4", week4);
});

app.get("/sales", function(req, res, next){
  req.getConnection(function(err, connection) {
      connection = mysql.createConnection(dbOptions);
      if (err) return next(err);
      connection.query("SELECT   DATE_FORMAT(sales.date,'%d %b %y') as date,sales.id, sales.product_id, sales.sold, sales.price ,products.product FROM sales, products WHERE sales.product_id = products.id AND sales.sold > 0 ORDER BY `sales`.`date` ASC ", function(err, data) {
            if (err) return next(err);
          if (err) return next(err);
          res.render("sales", {
              sales: data
          });
          // connection.end();
      });
  });
});

app.get('/categories', function(req, res, next) {
    req.getConnection(function(err, connection) {
      connection = mysql.createConnection(dbOptions);
        // connection = mysql.createConnection(dbOptions);
        if (err) return next(err);
        connection.query("SELECT categories.id, categories.category FROM categories", [],function(err, data) {
            if (err) return next(err);
            res.render("categories", {
                categories: data
            });
            // connection.end();
        });
    });
});

app.get('/products', function(req, res, next) {
    req.getConnection(function(err, connection) {
        connection = mysql.createConnection(dbOptions);
        if (err) return next(err);
        connection.query("SELECT products.id, products.product ,categories.category FROM products, categories WHERE products.category_id = categories.id  ORDER BY `products`.`id` ASC ", [], function(err, data) {

            if (err) return next(err);
            res.render("products", {
                products: data

            });
            // connection.end();
        });
    });
});

app.get("/purchases", function(req, res, next){
  req.getConnection(function(err, connection) {
      connection = mysql.createConnection(dbOptions);
      if (err) return next(err);
        connection.query("SELECT DATE_FORMAT(purchases.Date,'%d %b %y') as Date,purchases.id, products.product, purchases.stockItem, purchases.quantity, purchases.cost ,purchases.shop FROM purchases, products WHERE purchases.product_id = products.id ORDER BY `purchases`.`Date` ASC ", function(err, data) {
            if (err) return next(err);
          // if (err) return next(err);
          res.render("purchases", {
              purchases: data
          });
          // connection.end();
      });
  });

});

app.get("/users", function(req, res, next){
  req.getConnection(function(err, connection) {
      connection = mysql.createConnection(dbOptions);
      if (err) return next(err);
        connection.query("SELECT users.id, users.username, users.locked, users.admin FROM users ORDER BY users.id", function(err, data) {
            if (err) return next(err);
          // if (err) return next(err);
          res.render("users", {
              users: data
          });
          // connection.end();
      });
  });

});

app.get('/sales/addSales', salesCRUD.showAdd);
app.post('/sales/addSales', salesCRUD.add);
app.get('/sales/delete/:id', salesCRUD.delete);
app.get('/sales/editSales/:id', salesCRUD.get);
app.post('/sales/update/:id', salesCRUD.update);

app.get('/products/addProduct', productsCRUD.showAdd);
app.post('/products/addProduct', productsCRUD.add);
app.get('/products/delete/:id', productsCRUD.delete);
app.get('/products/editProduct/:id', productsCRUD.get);
app.post('/products/update/:id', productsCRUD.update);

app.get('/purchases/addPurchases', purchaseCRUD.showAdd);
app.post('/purchases/addPurchases', purchaseCRUD.add);
app.get('/purchases/delete/:id', purchaseCRUD.delete);
app.get('/purchases/editPurchases/:id', purchaseCRUD.get);
app.post('/purchases/update/:id', purchaseCRUD.update);

app.get('/categories/addCategory', categoriesCRUD.showAdd);
app.post('/categories/addCategory', categoriesCRUD.add);
app.get('/categories/delete/:id', categoriesCRUD.delete);
app.get('/categories/editCategory/:id', categoriesCRUD.get);
app.post('/categories/update/:id', categoriesCRUD.update);
// app.post('/functions/categoriesCRUD', categoriesCRUD.add);

// app.get('/users', usersCRUD.show);
app.get('/users/addUser', usersCRUD.showAdd);
app.post('/users/addUser', usersCRUD.add);
app.get('/users/delete/:id', usersCRUD.delete);
app.get('/users/editUsers/:id', usersCRUD.get);
app.post('/users/update/:id', usersCRUD.update);
// app.get('/users/search/:searchVal', users.search);
