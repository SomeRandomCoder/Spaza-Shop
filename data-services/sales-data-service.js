var queryBuilder = require('./queryBuilder');

module.exports = function(connection){
  var QueryService = new queryBuilder(connection);

  this.getSale = function(saleID) {
    return QueryService.execute("SELECT * FROM sales WHERE sales.id = ?",saleID);
  };


  this.showSale = function(cb, err) {
    // return QueryService.execute('SELECT * FROM sales');
    return QueryService.execute("SELECT DATE_FORMAT(sales.date,'%d %b %y') as date,sales.id, sales.product_id, sales.sold, sales.price ,products.product FROM sales, products WHERE sales.product_id = products.id AND sales.sold > 0 ORDER BY `sales`.`date` ASC ");

  };

  this.addSale = function(sale) {
    return QueryService.execute('INSERT INTO sales SET ?', sale);
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
