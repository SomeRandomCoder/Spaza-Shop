var co=require("co");
var mysql=require("mysql");
var SalesDataService=require("../data-services/sales-data-service");
var ProductsDataService=require("../data-services/products-data-service");
// var CategoriesDataService=require("../data-services/categories-data-service");

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
	// 	connection.query('SELECT * from sales, products', [], function(err, sales) {
  //       	if (err) return next(err);
  //   		res.render( 'addSales', {
	// 				sales : sales,
  //   		});
  //     	});
	// });
	co(function*(){
			var productsDataService=new ProductsDataService(connection);
			var results= yield productsDataService.showProduct();
			try{
				res.render( 'addSales', {
								sales : results,
								isAdmin: req.session.admin,
								isUser: req.session.username
							});
		}
		catch(err){
				console.log(err);
		}
});
};

exports.show= function(req, res){
  // req.getConnection(function(err, connection) {
	//
  //     if (err) return next(err);
  //     connection.query("SELECT   DATE_FORMAT(sales.date,'%d %b %y') as date,sales.id, sales.product_id, sales.sold, sales.price ,products.product FROM sales, products WHERE sales.product_id = products.id AND sales.sold > 0 ORDER BY `sales`.`date` ASC ", function(err, data) {
  //           if (err) return next(err);
  //         if (err) return next(err);
  //         res.render("sales", {
  //             sales: data,
  //             isAdmin: req.session.admin && req.session.username,
  //               isUser: !req.session.admin && req.session.username
  //         });
  //         // connection.end();
  //     });
  // });
	co(function*(){
			var salesDataService=new SalesDataService(connection);

			var result = yield salesDataService.showSale();
			try{


				 if(req.session.admin){
				res.render( 'sales', {
								sales : result,
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
  //     date: req.body.date,
  //     product_id : Number(req.body.product_id),
  //     sold: Number(req.body.sold),
  //     price: Number(req.body.price),
  // 		};
	// 	connection.query('insert into sales set ?', data, function(err, results) {
  // 			if (err) return next(err);
	// 			res.redirect('/sales');
	// 	});
	// });
	co(function*() {
    var salesDataService = new SalesDataService(connection);
      try {

          var data = {
            date: new Date(req.body.date),
            product_id: Number(req.body.product_id),
            sold: Number(req.body.sold),
						price :  Number(req.body.price)

          };

        var results = yield salesDataService.addSale(data);

                        res.redirect('/sales');

      } catch (err) {
          console.log(err);
      }
});
};

exports.get = function(req, res, next){
	// var id = req.params.id;
	// req.getConnection(function(err, connection){
	// 	connection.query('SELECT * FROM sales, products', [id], function(err, sales){
	// 		if(err) return next(err);
	// 		connection.query('SELECT * FROM sales WHERE id = ?', [id], function(err,products){
	// 			if(err) return next(err);
	// 			var product = products[0];
	// 			sales = sales.map(function(sale){
	// 				sale.selected = sales.product_id === product.id ? "selected" : "";
	// 				return sale;
	// 			});
	// 			res.render('editSales', {
	// 				sales : sales,
	// 				data : product
	// 			});
	// 		});
	// 	});
	// });
	co(function*() {
    var id = req.params.id;
    var salesDataService = new SalesDataService(connection);
    var productsDataService = new ProductsDataService(connection);

			var sales = yield salesDataService.showSale();

    	var products = yield productsDataService.showProduct();
    // var results = yield salesDataService.getSale(id);
      try {
        var join = Promise.join(sales,products, function(result){

				res.render('editSales', {
          data: result[0],
          sales: products,
          admin: req.session.admin,
          user: req.session.username
        });
      });
      } catch (err) {
          console.log(err);
      }
});
};

exports.update = function(req, res, next){

	var data = {
    date: req.body.date,
    product_id : Number(req.body.product_id),
    sold: Number(req.body.sold),
    price: Number(req.body.price),
		};
		var id = req.params.id;
  	req.getConnection(function(err, connection){
		if (err) return next(err);
		connection.query('UPDATE sales SET ? WHERE id = ?', [data, id], function(err, rows){
			if (err) return next(err);
      		res.redirect('/sales');
		});
    });
};

exports.delete = function(req, res, next){
	var id = req.params.id;
	req.getConnection(function(err, connection){
		connection.query('DELETE FROM sales WHERE id = ?', [id], function(err,rows){
			if(err) return next(err);
			res.redirect('/sales');
		});
	});
};

exports.search = function(req, res, next){
  req.getConnection(function(err, connection) {
    var searchVal = '%'+ req.params.searchVal +'%';
    connection.query('SELECT sales.id, DATE_FORMAT(sales.date, "%d %b %y")as date,sales.sold, sales.price, products.product FROM sales INNER JOIN products ON sales.product_id = products.id WHERE products.product LIKE ?', [searchVal], function(err, result){
      if(err) return console.log(err);
			console.log(searchVal);
      res.render('salesSearch',{
        search : result,
				isAdmin: req.session.admin,
				isUser: req.session.username,
				layout: false

      });
    });
  });
};
