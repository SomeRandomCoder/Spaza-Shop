module.exports = function(connection){
    this.getProduct = function(productId){
        connection.query('select * from products where products.id = ?', productId, function(err, products){
            if (err) throw err;
            if (products && products.length > 0){
                return  products[0].product;
            }
        });
    };

    this.showProduct = function(){
      connection.query("SELECT * FROM products ", [], function(err, products) {
            if (err) throw err;
            if (products && products.length > 0){
              return products;
            }
        });
    };


      this.addProduct = function(product){
        connection.query('INSERT INTO products (id,product,category_id) VALUES ?', [product], function(err,rows){
          if (err) throw err;
          console.log(rows);
          return  rows;
        });
      };

      this.updateProduct  =function(productID){
        connection.query('UPDATE products SET ? WHERE id = 20', [productID], function(err, rows){
          // console.log(err);
          if (err) throw err;
          return rows;
        });
      };

      this.deleteProduct = function(productID){
        connection.query('DELETE FROM products WHERE id = ?', [productID], function(err,rows){
          // console.log(err);
          if (err) throw err;
          return rows;
        });
      };

      this.searchProduct = function(searchVal){
        connection.query('SELECT products.id, products.product FROM products WHERE products.product LIKE = ? ', [searchVal], function(err, result){
          console.log(searchVal);
          if (err) throw err;
          return result;
        });
      };
};
