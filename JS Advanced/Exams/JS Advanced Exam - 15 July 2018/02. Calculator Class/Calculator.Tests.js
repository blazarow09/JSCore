let Calculator = require('./Calculator');
let assert = require('chai').assert;

describe('constructor tests', function () {

    let calculator;

    beforeEach(function () {
        calculator = new Calculator();
    });

    it('should be initialized with empty array', function () {

        assert.typeOf(calculator.expenses, 'array');
    });

    it('should have zero length', function () {


        assert.equal(calculator.expenses.length, 0);
    });

    it('should contain any data', function () {


        calculator.add('Pesho');
        calculator.add(10);
        calculator.add(5.4);

        assert.equal(calculator.expenses.toString(), 'Pesho,10,5.4')
    });

    it('should toString properly', function () {

        calculator.add('Pesho');
        calculator.add(10);
        calculator.add(5);

        assert.equal(calculator.toString(), 'Pesho -> 10 -> 5')
    });

    it('toString should return empty arr if is empty', function () {

        assert.equal(calculator.toString(), 'empty array')
    });

    it('should divide properly', function () {

        calculator.add(10);
        calculator.add('Pesho');
        calculator.add(5);
        calculator.add(1);
        assert.equal(calculator.divideNums(), 2)
    });
    it('division with zero', function() {
        calculator.add(10.5);
        calculator.add(0);

        assert.equal(calculator.divideNums(), 'Cannot divide by zero');
    });
    it('should return err string if expenses are zero', function () {

        assert.throw(() => calculator.divideNums(), 'There are no numbers in the array!' )
    });


    it('should orderBy mixed data properly', function () {

        calculator.add(10);
        calculator.add(5);
        calculator.add('Vankata');
        calculator.add(1);
        calculator.add('petraki');
        calculator.add(15);

        assert.equal(calculator.orderBy(), '1, 10, 15, 5, Vankata, petraki')
    });

    it('should orderBy nums properly', function () {

        calculator.add(10);
        calculator.add(5);
        calculator.add(1);
        calculator.add(15);

        assert.equal(calculator.orderBy(), '1, 5, 10, 15')
    })

});