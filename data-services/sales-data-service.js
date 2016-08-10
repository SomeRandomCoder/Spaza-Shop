var queryBuilder = require('./queryBuilder');

module.exports = function(connection){
  var QueryService = new queryBuilder(connection);

  this.getSale = function(saleID) {
    return QueryService.execute("SELECT * FROM sales WHERE sales.id = ?",saleID);
  };


  this.showSale = function(cb, err) {
    return QueryService.execute('SELECT * FROM sales');
  };

  this.addSale = function(sale) {
    return QueryService.execute('INSERT INTO sales SET ?', [sale]);
  };

  this.updateSale = function(sales, saleID) {
    return QueryService.execute('UPDATE sales SET ? WHERE id = ?', [sales,saleID]);
  };

  this.deleteSale = function( saleID) {
    return QueryService.execute("DELETE FROM sales WHERE id = ?",[saleID]);
  };

  this.searchSale = function( searchVal) {
    return QueryService.execute('SELECT * FROM sales WHERE sales.id LIKE  ? ', [searchVal]);
  };



};
