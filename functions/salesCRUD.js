
exports.showAdd = function(req, res){
	req.getConnection(function(err, connection){
		if (err) return next(err);
		connection.query('SELECT * from sales, products', [], function(err, sales) {
        	if (err) return next(err);
    		res.render( 'addSales', {
					sales : sales,
    		});
      	});
	});
};

exports.add = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err) return next(err);
		var data = {
      date: req.body.date,
      product_id : Number(req.body.product_id),
      sold: Number(req.body.sold),
      price: Number(req.body.price),
  		};
		connection.query('insert into sales set ?', data, function(err, results) {
  			if (err) return next(err);
				res.redirect('/sales');
		});
	});
};

exports.get = function(req, res, next){
	var id = req.params.id;
	req.getConnection(function(err, connection){
		connection.query('SELECT * FROM sales, products', [id], function(err, sales){
			if(err) return next(err);
			connection.query('SELECT * FROM sales WHERE id = ?', [id], function(err,products){
				if(err) return next(err);
				var product = products[0];
				sales = sales.map(function(sale){
					sale.selected = sales.product_id === product.id ? "selected" : "";
					return sale;
				});
				res.render('editSales', {
					sales : sales,
					data : product
				});
			});
		});
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
