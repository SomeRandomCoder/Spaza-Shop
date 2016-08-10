var queryBuilder = require('./queryBuilder');

module.exports=function(connection){
  var QueryService = new queryBuilder(connection);

  this.getPurchase = function(purchaseID) {
    return QueryService.execute("SELECT * FROM purchases WHERE purchases.id = ?",purchaseID);
  };
  this.showPurchase = function() {
    return QueryService.execute("SELECT * FROM purchases");
  };
  this.addPurchase = function(purchase) {
    return QueryService.execute('INSERT INTO purchases SET ?', [purchase]);
  };
  this.updatePurchase = function(purchase,purchaseID) {
    return QueryService.execute('UPDATE purchases SET ? WHERE id = ?', [purchase,purchaseID]);
  };
  this.deletePurchase = function(id) {
    return QueryService.execute('DELETE FROM purchases WHERE id = ?', [id]);
  };
  this.searchPurchase = function(searchVal) {
    return QueryService.execute('SELECT * FROM purchases WHERE purchases.StockItem LIKE ?', [searchVal]);
  };


  // this.getPurchase=function(purchaseID){
  //   connection.query("SELECT * FROM purchases WHERE purchases.id = ?",purchaseID,function(err, purchases){
  //     if(err) console.log(err);
  //     console.log(purchases[0].StockItem);
  //     if(purchases.length && purchases >0){
  //       return purchases[0].StockItem;
  //   }
  //   });
  // };

  // this.showPurchase=function(){
  //   connection.query('SELECT * FROM purchases', function(err, purchase){
  //     // console.log(purchase.length);
  //     if (err) console.log(err);
  //     if(purchase.length && purchase >0){
  //       return purchase;
  //     }
  //   });
  // };

  // this.addPurchase = function(purchase){
  //   connection.query('INSERT INTO purchases (id, product_id, StockItem,Quantity,Cost,Shop,Date) VALUES ?', [purchase], function(err,rows){
  //     if (err) console.log(err);
  //
  //     return  rows;
  //   });
  // };

  // this.updatePurchase  =function(purchase,purchasesID){
  //   connection.query('UPDATE purchases SET ? WHERE id = ?', [purchase,purchasesID], function(err, rows){
  //
  //     if (err) throw err;
  //     return rows;
  //   });
  // };

  // this.deletePurchase=function(id){
  //   connection.query('DELETE FROM purchases WHERE id = ?', [id], function(err, rows){
  //     if (err) console.log(err);
  //     return rows;
  //   });
  // };

  // this.searchPurchase = function(searchVal){
  //   connection.query('SELECT * FROM purchases WHERE purchases.StockItem LIKE = ? ', [searchVal], function(err, result){
  //     // console.log(searchVal);
  //     if (err) console.log(err);
  //     return result;
  //   });
  // };

};
