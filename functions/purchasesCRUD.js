exports.showAdd = function(req, res, next){
	req.getConnection(function(err, connection){
		if (err) return next(err);
		connection.query('SELECT * from purchases, products', [], function(err, purchases) {
			// connection.query("SELECT product_id,purchases.StockItem, DATE_FORMAT(purchases.Date,'%d %b %y') as Date,purchases.Shop, purchases.Cost, purchases.Quantity, products.product FROM purchases, products", [], function(err, purchases) {

        	if (err) return next(err);
    		res.render( 'addPurchases', {
					purchases : purchases,
    		});
      	});
	});
};

exports.add = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err) return next(err);
		var data = {
      date: req.body.date,
      quantity: Number(req.body.quantity),
      cost: Number(req.body.cost),
			product_id : Number(req.body.product_id),
			shop: req.body.shop
  		};
		connection.query('insert into purchases set ?', data, function(err, results) {
  			if (err) return next(err);
				res.redirect('/purchases');
		});
	});
};

exports.get = function(req, res, next){
	var id = req.params.id;
	req.getConnection(function(err, connection){
		connection.query('SELECT * FROM purchases, products', [id], function(err, purchases){
			if(err) return next(err);
			connection.query('SELECT * FROM purchases WHERE id = ?', [id], function(err,products){
				if(err) return next(err);
				var product = products[0];
				purchases = purchases.map(function(purchase){
					purchase.selected = purchases.product_id === product.id ? "selected" : "";
					return purchase;
				});
				res.render('editPurchases', {
					purchases : purchases,
					data : product
				});
			});
		});
	});
};

exports.update = function(req, res, next){

	var data = {
		date: req.body.date,
		quantity: Number(req.body.quantity),
		cost: Number(req.body.cost),
		product_id : Number(req.body.product_id),
		};
		var id = req.params.id;
  	req.getConnection(function(err, connection){
		if (err) return next(err);
		connection.query('UPDATE purchases SET ? WHERE id = ?', [data, id], function(err, rows){
			if (err) return next(err);
      		res.redirect('/purchases');
		});
    });
};

exports.delete = function(req, res, next){
	var id = req.params.id;
	req.getConnection(function(err, connection){
		connection.query('DELETE FROM purchases WHERE id = ?', [id], function(err,rows){
			if(err) return next(err);
			res.redirect('/purchases');
		});
	});
};

exports.search = function(req, res, next){
  req.getConnection(function(err, connection) {
    var searchVal = '%'+ req.params.searchVal +'%';
    connection.query('SELECT purchases.product_id, DATE_FORMAT(purchases.Date, "%d %b %y")as Date,purchases.Quantity, purchases.Shop, purchases.Cost,products.product FROM purchases INNER JOIN products ON purchases.product_id = products.id WHERE products.product LIKE ?', [searchVal], function(err, result){
      if(err) return console.log(err);
			console.log(searchVal);
      res.render('purchasesSearch',{
        search : result,
        		isAdmin: req.session.admin,
						isUser: req.session.username,
						layout: false
      });
    });
  });
};
