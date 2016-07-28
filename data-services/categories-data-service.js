module.exports = function(connection){
  this.getCategory=function(categoryID){
    connection.query("SELECT * FROM categories WHERE categories.id = ?",categoryID,function(err, categories){
      if(err) throw err;
      if(categories.length && categories >0){
        return categories[0].category;
    }
    });
  };

  this.showCategory=function(category){
    connection.query("SELECT categories.id, categories.category FROM categories", [],function(err, categories) {
      if (err) throw err;
      if(categories.length && categories >0){
        return categories;
      }
    });
  };

  this.addCategory=function(category){
    connection.query('INSERT INTO categories (id, category) VALUES ?', [category], function(err, rows) {
      if (err) console.log(err);
      return rows;

  });



};
};
