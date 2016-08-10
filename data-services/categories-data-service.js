  var queryBuilder = require('./queryBuilder');

module.exports = function(connection){
  var QueryService = new queryBuilder(connection);

  this.showCategory = function(cb, err) {
    return QueryService.execute('SELECT categories.id, categories.category FROM categories');
  };

  this.getCategory = function(categoryID) {
    return QueryService.execute('SELECT * FROM categories WHERE categories.id = ?', categoryID);
  };

  this.addCategory = function(category) {
    return QueryService.execute('INSERT INTO categories SET  ?', [category]);
  };

  this.updateCategory = function(category,categoryID) {
    return QueryService.execute('UPDATE categories SET ? WHERE id = ?', [category,categoryID]);
  };

  this.deleteCategory = function(categoryID) {
    return QueryService.execute('DELETE FROM categories WHERE id = ?', [categoryID]);
  };

  this.searchCategory = function(searchVal) {
    return QueryService.execute('SELECT * FROM categories WHERE categories.category LIKE ? ', searchVal);
  };
};
