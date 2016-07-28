module.exports = function(connection){
  this.getCategory=function(categoryID){
    connection.query("SELECT categories.category FROM categories WHERE categories.id = ?",categoryID,function(err, category){
      if(err) throw err;
      if(category.length && category >0){
        return category;
    }
    });
  };
};
