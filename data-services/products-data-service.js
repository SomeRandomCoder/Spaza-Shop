var queryBuilder = require('./queryBuilder');

module.exports = function(connection){
  var QueryService = new queryBuilder(connection);


  this.getProduct = function(productID) {
    return QueryService.execute('select * from products WHERE products.id = ? ', productID);
  };
  this.showProduct = function(cb, err) {
    return QueryService.execute('SELECT products.product, products.id, categories.category FROM products,categories where products.category_id = categories.id ORDER BY products.id ');
  };
  this.addProduct = function(product) {
    return QueryService.execute('INSERT INTO products SET ?', product);
  };
  this.updateProduct = function(products, productID) {
    return QueryService.execute('UPDATE products SET ? WHERE id = ?', [products,productID]);
  };
  this.deleteProduct = function( productID) {
    return QueryService.execute('DELETE FROM products WHERE id = ?', productID);
  };
  this.searchProduct = function(searchVal) {
    return QueryService.execute('SELECT products.id, products.product, categories.category FROM products INNER JOIN categories ON products.category_id = categories.id WHERE products.product LIKE ? OR categories.category LIKE ?', [searchVal,searchVal]);
  };
};
