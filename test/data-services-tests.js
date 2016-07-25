var ProductsDataService = require('../data-services/products-data-service');

describe('test the ProductsDataService', function(){
    // Uncomment the line below and create a connection to your mysql database
    // var connection =

    it('getProduct should return a specific product', function(done){
        var productsDataService = new ProductsDataService(connection);
        productsDataService.getProduct(9, function(err, product) {
            assert.equal('milk', product.name);
        });
    });
});
