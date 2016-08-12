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

};

exports.search = function(req, res, next){
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
