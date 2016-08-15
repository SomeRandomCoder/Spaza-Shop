var co=require("co");
var mysql=require("mysql");
var ProductsDataService=require("../data-services/products-data-service");
var CategoriesDataService=require("../data-services/categories-data-service");

var Promise=require("bluebird");

var password = process.env.MYSQL_PWD !== undefined ? process.env.MYSQL_PWD : 'mxmaolqk';
// console.log(password);

var connection = mysql.createConnection({
  host: '127.0.0.1',
  user: process.env.MYSQL_USER ||'root',
  password: password,
  database: 'nelisaDB'
});

exports.showAdd = function(req, res){
	// req.getConnection(function(err, connection){
	// 	if (err) return next(err);
	// 	connection.query('SELECT * from products', [], function(err, categories) {
  //       	if (err) return next(err);
  //   		res.render( 'addProduct', {
	// 				categories : categories,
  //   		});
  //     	});
	// });
	co(function*(){
			var productsDataService=new ProductsDataService(connection);
			var results= yield productsDataService.showProduct();
			try{
				res.render( 'addProduct', {
								categories : results,
								isAdmin: req.session.admin,
								isUser: req.session.username
							});
		}
		catch(err){
				console.log(err);
		}
});
};

exports.show= function(req, res) {
    co(function*(){
				var productsDataService=new ProductsDataService(connection);

				var result = yield productsDataService.showProduct();
				try{


					 if(req.session.admin){
					res.render( 'products', {
									products : result,
									isAdmin: req.session.admin,
									isUser: req.session.username
								});
							}else{
								res.render("productsRegUser",{
									products : results

								});
							}

			}
			catch(err){
					console.log(err);
			}
	});
};

exports.add = function (req, res, next) {
	co(function*(){
				var productsDataService=new ProductsDataService(connection);
				try{
					var data= {
						product:req.body.product,
						category_id: Number(req.body.category_id)
						};
					var results= yield productsDataService.addProduct(data);
					res.redirect("/products");
			}
			catch(err){
					console.log(err);
			}
	});

};

exports.get = function(req, res, next){
		co(function*(){
		var id= req.params.id;
				var productsDataService=new ProductsDataService(connection);
				var categoriesDataService=new CategoriesDataService(connection);

				var getPro = yield productsDataService.getProduct(id);
				var showCat = yield categoriesDataService.showCategory();
				console.log("Product",getPro);
				console.log(id);
				console.log("Category",showCat);

				try{
					res.render("editProduct",{
					data: getPro[0],
					categories: showCat,
					isAdmin: req.session.admin,
				  isUser: req.session.username

			 });

			}
			catch(err){
					console.log(err);
			}
	});
};

exports.update = function(req, res, next){
		co(function* (){
				var productsDataService=new ProductsDataService(connection);
				try{
					var data={
						product: req.body.product,
						category_id: Number(req.body.category_id)
					};
					var id= req.params.id;
					var results= yield productsDataService.updateProduct(data, id);
					res.redirect("/products");
			}
			catch(err){
					console.log(err);
			}
	});
};

exports.delete = function(req, res, next){
	co(function*(){
	var id = req.params.id;
				var productsDataService=new ProductsDataService(connection);
				try{
					var results= yield productsDataService.deleteProduct(id);
					res.redirect("/products");
			}
			catch(err){
					console.log(err);
			}
	});
};


exports.search = function(req, res, next){
	co(function*() {
		var productsDataService=new ProductsDataService(connection);
    var searchVal = '%'+ req.params.searchVal +'%';

      try {
        var results = yield productsDataService.searchProduct([searchVal]);
        res.render('productsSearch', {
          search: results,
          admin: req.session.admintab,
          user: req.session.username,
          layout: false
        });
      } catch (err) {
          console.log(err);
      }
});
};
