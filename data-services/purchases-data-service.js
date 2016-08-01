module.exports=function(connection){

  this.getPurchase=function(purchaseID){
    connection.query("SELECT * FROM purchases WHERE purchases.id = ?",purchaseID,function(err, purchases){
      if(err) console.log(err);
      if(purchases.length && purchases >0){
        return purchases[0].StockItem;
    }
    });
  };

  this.showPurchase=function(){
    connection.query('SELECT * FROM purchases', function(err, purchase){
      if (err) console.log(err);
      if(purchase.length && purchase >0){
        return purchase;
      }
    });
  };

};
