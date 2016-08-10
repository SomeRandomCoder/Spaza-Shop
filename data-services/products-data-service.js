var queryBuilder = require('./queryBuilder');

module.exports = function(connection){
  var QueryService = new queryBuilder(connection);


  this.getProduct = function(productID) {
    return QueryService.execute('select * from products where products.id = ?', productID);
  };
  this.showProduct = function(cb, err) {
    return QueryService.execute('SELECT * FROM products ');
  };
  this.addProduct = function(product) {
    return QueryService.execute('INSERT INTO products SET ?', [product]);
  };
  this.updateProduct = function(products, productID) {
    return QueryService.execute('UPDATE products SET ? WHERE id = ?', [products,productID]);
  };
  this.deleteProduct = function( productID) {
    return QueryService.execute('DELETE FROM products WHERE id = ?', [productID]);
  };
  this.searchProduct = function(searchVal) {
    return QueryService.execute('SELECT * FROM products WHERE products.product LIKE ? ', [searchVal]);
  };
};
