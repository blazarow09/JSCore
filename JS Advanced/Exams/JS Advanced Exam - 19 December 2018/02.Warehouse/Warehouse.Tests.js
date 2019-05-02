let Warehouse = require('./Warehouse');
let assert = require('chai').assert;

describe('addProduct tests', function () {
    let warehouse;

    beforeEach(function () {

        warehouse = new Warehouse(10);
    });

    it('should throw error if there is no place for product', function () {

        assert.throw(() => warehouse.addProduct('Food', 'Gosho', 12), 'There is not enough space or the warehouse is already full')
    });

    it('should sum the quantity of product is added twice', function () {

        warehouse.addProduct('Food', 'Ivan', 2);
        warehouse.addProduct('Food', 'Ivan', 3);

        assert.equal(warehouse.availableProducts['Food']['Ivan'], 5)
    });
});

describe('orderProducts tests', function () {
    it('should return correct order', function () {

        let warehouse = new Warehouse(20);

        warehouse.addProduct('Food', 'Ivan', 7);
        warehouse.addProduct('Food', 'Tosho', 4);
        warehouse.orderProducts('Food');

        assert.equal(JSON.stringify(warehouse.availableProducts['Food']),
            '{"Ivan":7,"Tosho":4}')
    });
});

describe('occupiedCapacity tests', function () {
    let warehouse;

    beforeEach(function () {

        warehouse = new Warehouse(10);
    });

    it('should return already occupied place in wh', function () {

        warehouse.addProduct('Food', 'Dragan', 2);

        assert.equal(warehouse.occupiedCapacity(), 2);
    });
});

describe('revision tests', function () {
    let warehouse;

    beforeEach(function () {

        warehouse = new Warehouse(20);
    });

    it('should throw error if warehouse is empty', function () {

        let emptyWhMsg = warehouse.revision();

        assert.equal(emptyWhMsg, 'The warehouse is empty')
    });

    it('should return string with all available products in wh', function () {

        warehouse.addProduct('Food', 'Ivan', 2);
        warehouse.addProduct('Food', 'Dragan', 2);
        warehouse.addProduct('Food', 'Ivan', 2);
        warehouse.addProduct('Food', 'Petkan', 2);

        let revision = warehouse.revision();

        assert.equal(revision, 'Product type - [Food]\n- Ivan 4\n- Dragan 2\n- Petkan 2\nProduct type - [Drink]')
    });
});

describe('scrapeAProduct tests', function () {
    let warehouse;

    beforeEach(function () {
        warehouse = new Warehouse(20);
    });

    it('should reduce quantity of product', function () {
        warehouse.addProduct('Food', 'Gosho', 2);
        warehouse.addProduct('Food', 'Gosho', 7);
        warehouse.scrapeAProduct('Gosho', 5);
        let qnt = warehouse.availableProducts['Food']['Gosho'];
        assert.equal(qnt, 4)
    });

    it('should throw error message if cant find the product', function () {

        assert.throw(() => warehouse.scrapeAProduct('Vodka', 2), 'Vodka do not exists');
    });
});

describe('addProduct tests', function () {
    it('should throw error if there is no place for product', function () {
        let warehouse = new Warehouse(20);

        assert.throw(() => warehouse.addProduct('Food', 'Gosho', 12), 'There is not enough space or the warehouse is already full')
    });

    it('should sum the quantity of product is added twice', function () {
        let warehouse = new Warehouse(20);

        warehouse.addProduct('Food', 'Ivan', 2);
        warehouse.addProduct('Food', 'Ivan', 3);

        assert.equal(warehouse.availableProducts['Food']['Ivan'], 5)
    });
});

describe('orderProducts tests', function () {
    it('should return correct order', function () {

        let warehouse = new Warehouse(20);

        warehouse.addProduct('Food', 'Ivan', 7);
        warehouse.addProduct('Food', 'Tosho', 4);
        warehouse.orderProducts('Food');

        assert.equal(JSON.stringify(warehouse.availableProducts['Food']),
            '{"Ivan":7,"Tosho":4}')
    });
});

describe('occupiedCapacity tests', function () {
    it('should return already occupied place in wh', function () {
        let warehouse = new Warehouse(20);

        warehouse.addProduct('Food', 'Dragan', 2);

        assert.equal(warehouse.occupiedCapacity(), 2);
    });
});

describe('revision tests', function () {
    it('should throw error if warehouse is empty', function () {
        let warehouse = new Warehouse(20);

        let emptyWhMsg = warehouse.revision();

        assert.equal(emptyWhMsg, 'The warehouse is empty')
    });

    it('should return string with all available products in wh', function () {
        let warehouse = new Warehouse(20);

        warehouse.addProduct('Food', 'Ivan', 2);
        warehouse.addProduct('Food', 'Dragan', 2);
        warehouse.addProduct('Food', 'Ivan', 2);
        warehouse.addProduct('Food', 'Petkan', 2);

        let revision = warehouse.revision();

        assert.equal(revision, 'Product type - [Food]\n- Ivan 4\n- Dragan 2\n- Petkan 2\nProduct type - [Drink]')
    });
});

describe('scrapeAProduct tests', function () {
    it('should reduce quantity of product', function () {
        let warehouse = new Warehouse(20);

        warehouse.addProduct('Food', 'Gosho', 2);
        warehouse.addProduct('Food', 'Gosho', 7);
        warehouse.scrapeAProduct('Gosho', 5);
        let qnt = warehouse.availableProducts['Food']['Gosho'];
        assert.equal(qnt, 4)
    });

    it('should throw error message if cant find the product', function () {
        let warehouse = new Warehouse(20);

        assert.throw(() => warehouse.scrapeAProduct('Vodka', 2), 'Vodka do not exists');
    });
});