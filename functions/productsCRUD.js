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
  database: 'travis_DB'
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
    // req.getConnection(function(err, connection) {
    //     if (err) return next(err);
    //     connection.query("SELECT products.id, products.product ,categories.category FROM products, categories WHERE products.category_id = categories.id  ORDER BY `products`.`id` ASC ", [], function(err, data) {
    //         if (err) return next(err);
    //         if(req.session.admin){
    //         res.render("products", {
    //             products: data,
    //             isAdmin: req.session.admin && req.session.username,
    //               isUser: !req.session.admin && req.session.username
    //         });
    //       }
    //       else{
    //         res.render("productsRegUser",{
    //           products: data
    //         });
    //       }
    //         // connection.end();
    //     });
    // });

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
	// req.getConnection(function(err, connection){
	// 	if (err) return next(err);
	// 	var data = {
	// 		category_id : Number(req.body.category_id),
  //     		product : req.body.product,
	// 		// price : Number(req.body.price)
  // 		};
	//
	// 	connection.query('insert into products set ?', data, function(err, results) {
  // 			if (err) return next(err);
	// 			res.redirect('/products');
	// 	});
	// });

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
	// var id = req.params.id;
	// req.getConnection(function(err, connection){
	// 	connection.query('SELECT * FROM categories', [id], function(err, categories){
	// 		if(err) return next(err);
	// 		connection.query('SELECT * FROM products WHERE id = ?', [id], function(err,products){
	// 			if(err) return next(err);
	// 			var product = products[0];
	// 			categories = categories.map(function(category){
	// 				category.selected = category.id === product.category_id ? "selected" : "";
	// 				return category;
	// 			});
	// 			res.render('editProduct', {
	// 				categories : categories,
	// 				data : product
	// 			});
	// 		});
	// 	});
	// });

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
	//
	// var data = {
	// 	category_id : Number(req.body.category_id),
	// 	product : req.body.product,
	// 	// price : Number(req.body.price)
	// };
  // 	var id = req.params.id;
  // 	req.getConnection(function(err, connection){
	// 	if (err) return next(err);
	// 	connection.query('UPDATE products SET ? WHERE id = ?', [data, id], function(err, rows){
	// 		if (err) return next(err);
  //     		res.redirect('/products');
	// 	});
  //   });

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
	// var id = req.params.id;
	// req.getConnection(function(err, connection){
	// 	connection.query('DELETE FROM products WHERE id = ?', [id], function(err,rows){
	// 		if(err) return next(err);
	// 		res.redirect('/products');
	// 	});
	// });

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
  // req.getConnection(function(err, connection) {
  //   var searchVal = '%'+ req.params.searchVal +'%';
	// 	console.log(searchVal);
  //   connection.query('SELECT products.id, products.product, categories.category FROM products INNER JOIN categories ON products.category_id = categories.id WHERE products.product LIKE ? OR categories.category LIKE ?', [searchVal, searchVal], function(err, result){
  //     if(err) return console.log(err);
  //     res.render('productsSearch',{
  //       search : result,
  //       		isAdmin: req.session.admin,
	// 					isUser: req.session.username,
	// 					layout: false
  //     });
  //   });
  // });

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
