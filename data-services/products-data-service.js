module.exports = function(connection){
    this.getProduct = function(productId, cb){
        connection.query('select productName from products where productId = ?', productId, function(err, products){
            if (err) return cb(err, null);
            if (products && products.length > 0){
                return cb(null, products[0]);
            }
        });
    };
};
