// var  bodyParser = require('body-parser');
var co=require("co");
var mysql=require("mysql");
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
	// 	connection.query('SELECT * from categories', [], function(err, categories) {
  //       	if (err) return next(err);
  //   		res.render( 'addCategory', {
	// 				categories : categories,
	// 				isAdmin: req.session.admin,
	// 				isUser: req.session.username
  //   		});
  //     	});
	// });

	co(function*(){
				var categoriesDataService=new CategoriesDataService(connection);
				var results= yield categoriesDataService.showCategory();
				try{
					res.render( 'addCategory', {
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
		//
    //     // connection = mysql.createConnection(dbOptions);
    //     if (err) return next(err);
    //     connection.query("SELECT categories.id, categories.category FROM categories", [],function(err, data) {
    //         if (err) return next(err);
    //         if(req.session.admin){
    //           res.render("categories", {
    //             categories: data,
    //             isAdmin: req.session.admin && req.session.username,
    //               isUser: !req.session.admin && req.session.username
    //         });
    //       }
    //       else{
    //         res.render("categoriesRegUser",{
    //           categories: data
    //         });
    //       }
    //         // connection.end();
    //     });
    // });

		co(function*(){
					var categoriesDataService=new CategoriesDataService(connection);
					var results= yield categoriesDataService.showCategory();
					try{
						 if(req.session.admin){
						res.render( 'categories', {
										categories : results,
										isAdmin: req.session.admin,
										isUser: req.session.username
					    		});
								}else{
									res.render("categoriesRegUser",{
										categories : results

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
  //     		category : req.body.category,
	//
  // 		};
	//
	// 	connection.query('insert into categories set ?', data, function(err, results) {
  // 			if (err) return next(err);
	// 			res.redirect('/categories');
	// 	});
	// });
	co(function*(){
				var categoriesDataService=new CategoriesDataService(connection);
				try{
					var data= {category:req.body.category};
					var results= yield categoriesDataService.addCategory(data);
					res.redirect("/categories");
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
	// 		connection.query('SELECT * FROM categories WHERE id = ?', [id], function(err,category){
	// 			if(err) return next(err);
	// 			var item = category[0];
	// 			categories = categories.map(function(item){
	// 				return item;
	// 			});
	// 			res.render('editCategory', {
	// 				categories : categories,
	// 				data : item,
	// 				isAdmin: req.session.admin,
	// 				isUser: req.session.username
	// 			});
	// 		});
	// 	});
	// });

	co(function*(){
		var id= req.params.id;
				var categoriesDataService=new CategoriesDataService(connection);
				var get = categoriesDataService.getCategory(id);
				var show = categoriesDataService.showCategory();

				try{
					Promise.join(get,show,function(result){

					res.render("editCategory",{
					data: result[0],
					isAdmin: req.session.admin,
				  isUser: req.session.username

			 });
		 });
			}
			catch(err){
					console.log(err);
			}
	});
};

exports.update = function(req, res, next){

  // var data = {
  //       category : req.body.category,
  //   };
	//
  // // console.log("test");
  // 	var id = req.params.id;
  // 	req.getConnection(function(err, connection){
	// 	if (err) return next(err);
	// 	connection.query('UPDATE categories SET ? WHERE id = ?', [data, id], function(err, rows){
	// 		if (err) return next(err);
  //     		res.redirect('/categories');
	// 	});
  //   });

	co(function* (){
				var categoriesDataService=new CategoriesDataService(connection);
				try{
					var id= req.params.id;
					var data={category: req.body.category};
					var results= yield categoriesDataService.updateCategory(id,data);
					res.redirect("/categories");
			}
			catch(err){
					console.log(err);
			}
	});
};

exports.delete = function(req, res, next){
	co(function*(){
	var id = req.params.id;

				var categoriesDataService=new CategoriesDataService(connection);
				try{
					var results= yield categoriesDataService.deleteCategory(id);
					res.redirect("/categories");
			}
			catch(err){
					console.log(err);
			}
	});
	// req.getConnection(function(err, connection){
	// 	connection.query('DELETE FROM categories WHERE id = ?', [id], function(err,rows){
	// 		if(err) return next(err);
	// 		res.redirect('/categories');
	// 	});
	// });
};

exports.search = function(req, res, next){
  // req.getConnection(function(err, connection) {
  //   var searchVal = '%'+ req.params.searchVal +'%';
  //   connection.query('SELECT * FROM categories WHERE categories.category LIKE ?', [searchVal], function(err, result){
  //     if(err) return console.log(err);
	// 		console.log(searchVal);
  //     res.render('categoriesSearch',{
  //       search : result,
  //       		isAdmin: req.session.admin,
	// 					isUser: req.session.username,
	// 					layout:false
	//
  //     });
  //   });
  // });

	co(function*() {
		var categoriesDataService=new CategoriesDataService(connection);

    var searchVal = '%'+ req.params.searchVal +'%';

      try {
        var results = yield categoriesDataService.searchCategory([searchVal]);
        res.render('categoriesSearch', {
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
