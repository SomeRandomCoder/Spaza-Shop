// var  bodyParser = require('body-parser');

exports.showAdd = function(req, res){
	req.getConnection(function(err, connection){
		if (err) return next(err);
		connection.query('SELECT * from categories', [], function(err, categories) {
        	if (err) return next(err);
    		res.render( 'addCategory', {
					categories : categories,
					isAdmin: req.session.admin,
					isUser: req.session.username
    		});
      	});
	});
};

exports.add = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err) return next(err);
		var data = {
      		category : req.body.category,

  		};

		connection.query('insert into categories set ?', data, function(err, results) {
  			if (err) return next(err);
				res.redirect('/categories');
		});
	});
};
exports.get = function(req, res, next){
	var id = req.params.id;
	req.getConnection(function(err, connection){
		connection.query('SELECT * FROM categories', [id], function(err, categories){
			if(err) return next(err);
			connection.query('SELECT * FROM categories WHERE id = ?', [id], function(err,category){
				if(err) return next(err);
				var item = category[0];
				categories = categories.map(function(item){
					return item;
				});
				res.render('editCategory', {
					categories : categories,
					data : item,
					isAdmin: req.session.admin,
					isUser: req.session.username
				});
			});
		});
	});
};

exports.update = function(req, res, next){

  var data = {
        category : req.body.category,
    };

  // console.log("test");
  	var id = req.params.id;
  	req.getConnection(function(err, connection){
		if (err) return next(err);
		connection.query('UPDATE categories SET ? WHERE id = ?', [data, id], function(err, rows){
			if (err) return next(err);
      		res.redirect('/categories');
		});
    });
};

exports.delete = function(req, res, next){
	var id = req.params.id;
	req.getConnection(function(err, connection){
		connection.query('DELETE FROM categories WHERE id = ?', [id], function(err,rows){
			if(err) return next(err);
			res.redirect('/categories');
		});
	});
};

exports.search = function(req, res, next){
  req.getConnection(function(err, connection) {
    var searchVal = '%'+ req.params.searchVal +'%';
    connection.query('SELECT * FROM categories WHERE categories.category LIKE ?', [searchVal], function(err, result){
      if(err) return console.log(err);
			console.log(searchVal);
      res.render('categoriesSearch',{
        search : result,
        		isAdmin: req.session.admin,
						isUser: req.session.username,
						layout:false

      });
    });
  });
};
