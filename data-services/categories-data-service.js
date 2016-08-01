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
    connection.query('SELECT categories.id, categories.category FROM categories', [],function(err, categories) {
      if (err) throw err;
      if(categories.length && categories >0){

        return categories;
      }
    });
  };

  this.addCategory = function(category){
    connection.query('INSERT INTO categories (id,category) VALUES ?', [category], function(err,rows){
      if (err) console.log(err);
      // console.log(category);
      return  rows;
    });
  };

  this.updateCategory=function(categoryID){
    connection.query('UPDATE categories SET ? WHERE id = ?', [categoryID], function(err, rows){
      if (err) throw err;
      return rows;
    });
  };

this.deleteCategory=function(categoryID){
  connection.query("DELETE FROM categories WHERE id = ?",categoryID,function(err,rows){
    if (err) throw err;
    return rows;
  });
};

this.searchCategory = function(searchVal){
  connection.query('SELECT * FROM categories WHERE categories.category LIKE = ? ', [searchVal], function(err, result){
    // console.log(searchVal);
    if (err) throw err;
    return result;
  });
};



};
