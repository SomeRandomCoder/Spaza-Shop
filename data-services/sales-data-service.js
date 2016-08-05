module.exports = function(connection){
  this.getSale=function(saleID){
    connection.query("SELECT * FROM sales WHERE sales.id = ?",saleID,function(err, sales){
      if(err) throw err;
      if(sales.length && sales >0){
        return sales[0].product_id;
    }
    });
  };

  this.showSale=function(){
    connection.query('SELECT * FROM sales', [],function(err, sales) {
      if (err) throw err;
      if(sales.length && sales >0){

        return sales;
      }
    });
  };

  this.addSale = function(sale){
    connection.query('INSERT INTO sales (id,date,product_id,sold, price) VALUES ?', [sale], function(err,rows){
      if (err) console.log(err);
      // console.log(category);
      return  rows;
    });
  };

  this.updateSale=function(sales,saleID){
    connection.query('UPDATE sales SET ? WHERE id = ?', [sales,saleID], function(err, rows){
      if (err) throw err;
      return rows;
    });
  };

this.deleteSale=function(saleID){
  connection.query("DELETE FROM sales WHERE id = ?",[saleID],function(err,rows){
    if (err) throw err;
    return rows;
  });
};

this.searchSale = function(searchVal){
  connection.query('SELECT * FROM sales WHERE sales.id LIKE = ? ', [searchVal], function(err, result){
    // console.log(searchVal);
    if (err) throw err;
    return result;
  });
};



};
