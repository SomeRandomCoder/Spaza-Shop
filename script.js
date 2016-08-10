var fs = require('fs'),
 handlebars = require('express-handlebars'),
 express = require('express'),
 app = express(),
 mysql = require('mysql'),
 myConnection = require("express-myconnection"),
 connectionProvider=require('connection-provider'),
 bodyParser = require('body-parser'),
 session = require("express-session"),
 bcrypt=require("bcrypt"),
 flash=require('express-flash');


var weeklySales = require('./functions/weeklySales'),
 mostPopularProduct = require('./functions/mostPopularProduct'),
 leastPopularProduct = require('./functions/leastPopularProduct'),
 mostPopularCategory = require('./functions/mostPopularCategory'),
 leastPopularCategory = require('./functions/leastPopularCategory'),
 mostProfitableProduct = require('./functions/mostProfitableProduct'),
 mostProfitableCategory = require("./functions/mostProfitableCategory"),
 categories = require("./functions/mostPopularCategory"),
 bought = require("./functions/mostProfitableCategory"),
 categoriesCRUD=require('./functions/categoriesCRUD'),
 productsCRUD=require("./functions/productsCRUD"),
 salesCRUD=require("./functions/salesCRUD"),
 purchaseCRUD=require("./functions/purchasesCRUD"),
 signup=require("./functions/signup"),
 usersCRUD=require("./functions/users"),
 login=require("./functions/login");


var ProductsDataService = require("./data-services/products-data-service"),
 CategoriesDataService = require("./data-services/categories-data-service"),
 SalesDataService = require("./data-services/sales-data-service"),
 PurchasesDataService = require("./data-services/purchases-data-service"),
UsersDataService = require("./data-services/user-data-service");

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(bodyParser.json());

app.use(express.static("public"));

app.use(flash());

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: false
}));


var dbOptions = {
  host: "127.0.0.1",
  user: 'root',
  password: "mxmaolqk",
  port: 3306,
  database: 'nelisaDB'
};

var setupCallback = function(connection){
  return {
    productDataService : new ProductsDataService(connection),
    categoriesDataService : new CategoriesDataService(connection),
    salesDataService : new SalesDataService(connection),
    purchasesDataService : new PurchasesDataService(connection),
    usersDataService : new UsersDataService(connection)
  };
};
app.use(connectionProvider(dbOptions,setupCallback));

var connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: "mxmaolqk",
  database: 'nelisaDB'
});
app.use(myConnection(mysql, dbOptions, "single"));

var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log("app listening at http://%s:%s", host, port);
});

app.engine("handlebars", handlebars({
  defaultLayout: "main"
}));
app.set("view engine", "handlebars");

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


app.use(function(req,res,next){
  var isAdmin = req.session.admin && req.session.username,
      isUser = !req.session.admin && req.session.username,
      userInSession = req.session.username,
      pathIsLogin = req.path === "/login",
      pathIsSignUp = req.path === "/signup";

console.log("IS ADMIN", isAdmin);
console.log("IS USER", isUser);
console.log("USER IN SESSION", userInSession);

  var generalPath = req.path.split("/")[1] === "login"
              || req.path.split("/")[1] === "logout"
              || req.path.split("/")[1] === "signup"
              || req.path.split("/")[1] === "products"
              || req.path.split("/")[1] === "categories"
              || req.path.split("/")[1] === "index"
              || req.path === "/"
              || req.path.split("/")[1] === "week1"
              || req.path.split("/")[1] === "week2"
              || req.path.split("/")[1] === "week3"
              || req.path.split("/")[1] === "week4"

  var adminPath = req.path.split("/")[1] === "products"
               || req.path.split("/")[1] === "categories"
               || req.path.split("/")[1] === "sales"
               || req.path.split("/")[1] === "purchases"
               || req.path.split("/")[1] === "users"
               || req.path.split("/")[1] === "editUsers"
               || req.path.split("/")[1] === "editSales"
               || req.path.split("/")[1] === "editPurchases"
               || req.path.split("/")[1] === "editProducts"

  if (!userInSession && req.path==="/") {
    res.redirect("/login");
  } else if (!userInSession && (pathIsLogin || pathIsSignUp)) {
    next();
  }
  else if (isUser && generalPath) {
    next();
  } else if (isUser && adminPath) {
    res.redirect("/");
  } else if (isAdmin && (adminPath || generalPath)) {
    next();
  }

});

app.get("/signup", function(req, res, next){
  req.getConnection(function(err, connection){
    if(err) return next(err);
    res.render("signup");
  });
});
app.post('/signup', signup);

app.get("/login", function(req, res, next){
  req.getConnection(function(err, connection){
    if(err) return next(err);
    res.render("login");
  });
});
app.post('/login', login);

app.get('/logout', function(req, res) {
    delete req.session.username;
    delete req.session.admin;
    res.redirect('/login');
});

app.get("/", function(req, res) {
  res.render("homePage", {isAdmin: req.session.admin && req.session.username,isUser: !req.session.admin && req.session.username });
});

app.get("/aboutus", function(req, res) {
  res.render("aboutus", {isAdmin: req.session.admin && req.session.username,isUser: !req.session.admin && req.session.username });
});

app.get("/index", function(req, res) {
  res.render("index",{isAdmin: req.session.admin && req.session.username,isUser: !req.session.admin && req.session.username });
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


app.get('/sales', salesCRUD.show);
app.get('/sales/addSales', salesCRUD.showAdd);
app.post('/sales/addSales', salesCRUD.add);
app.get('/sales/delete/:id', salesCRUD.delete);
app.get('/sales/editSales/:id', salesCRUD.get);
app.post('/sales/update/:id', salesCRUD.update);
app.get("/sales/search/:searchVal", salesCRUD.search);
app.post("/sales/search/", salesCRUD.search);

app.get('/products', productsCRUD.show);
app.get('/products/addProduct', productsCRUD.showAdd);
app.post('/products/addProduct', productsCRUD.add);
app.get('/products/delete/:id', productsCRUD.delete);
app.get('/products/editProduct/:id', productsCRUD.get);
app.post('/products/update/:id', productsCRUD.update);
app.get("/products/search/:searchVal", productsCRUD.search);
app.post("/products/search/", productsCRUD.search);

app.get('/purchases',purchaseCRUD.show);
app.get('/purchases/addPurchases', purchaseCRUD.showAdd);
app.post('/purchases/addPurchases', purchaseCRUD.add);
app.get('/purchases/delete/:id', purchaseCRUD.delete);
app.get('/purchases/editPurchases/:id', purchaseCRUD.get);
app.post('/purchases/update/:id', purchaseCRUD.update);
app.get("/purchases/search/:searchVal", purchaseCRUD.search);
app.post("/purchases/search/", purchaseCRUD.search);

app.get('/categories', categoriesCRUD.show);
app.get('/categories/addCategory', categoriesCRUD.showAdd);
app.post('/categories/addCategory', categoriesCRUD.add);
app.get('/categories/delete/:id', categoriesCRUD.delete);
app.get('/categories/editCategory/:id', categoriesCRUD.get);
app.post('/categories/update/:id', categoriesCRUD.update);
app.get("/categories/search/:searchVal", categoriesCRUD.search);
app.post("/categories/search/", categoriesCRUD.search);

app.get('/users', usersCRUD.show);
app.get('/users/addUser', usersCRUD.showAdd);
app.post('/users/addUser', usersCRUD.add);
app.get('/users/delete/:id', usersCRUD.delete);
app.get('/users/editUsers/:id', usersCRUD.get);
app.post('/users/update/:id', usersCRUD.update);
app.get("/users/search/:searchVal", usersCRUD.search);
app.post("/users/search", usersCRUD.search);
