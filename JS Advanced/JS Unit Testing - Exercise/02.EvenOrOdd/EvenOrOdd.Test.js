let isOddOrEven = require('./EvenOrOdd');

let expect = require('chai').expect;
let assert = require('chai').assert;

describe('Even or odd', function () {
    it('return even', function () {
        assert.equal(isOddOrEven('test'), 'even');
    });
    it('should return odd', function () {
        assert.equal(isOddOrEven('asd'), 'odd')
    });

    it('should return undefined', function () {
        assert.equal(isOddOrEven(23), undefined)
    });
});