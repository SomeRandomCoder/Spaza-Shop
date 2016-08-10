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

  // this.updateSale=function(sales,saleID){
  //   connection.query('UPDATE sales SET ? WHERE id = ?', [sales,saleID], function(err, rows){
  //     if (err) throw err;
  //     return rows;
  //   });
  // };

// this.deleteSale=function(saleID){
//   connection.query("DELETE FROM sales WHERE id = ?",[saleID],function(err,rows){
//     if (err) throw err;
//     return rows;
//   });
// };
this.deleteSale = function( saleID) {
  return QueryService.execute("DELETE FROM sales WHERE id = ?",[saleID]);
};

this.searchSale = function( searchVal) {
  return QueryService.execute('SELECT * FROM sales WHERE sales.id LIKE  ? ', [searchVal]);
};

// this.searchSale = function(searchVal){
//   connection.query('SELECT * FROM sales WHERE sales.id LIKE = ? ', [searchVal], function(err, result){
//     // console.log(searchVal);
//     if (err) throw err;
//     return result;
//   });
// };



};
