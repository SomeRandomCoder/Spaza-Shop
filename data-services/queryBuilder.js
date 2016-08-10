var Promise=require("bluebird");

module.exports = function(connection){
    this.execute = function(sql, params){
        return new Promise(function(resolve, reject) {
            connection.query(sql, params || {}, function(err, results) {
                if (err) return reject(err);
                resolve(results);
            });
        });
    };
};
