const AutoService = require('./autoService.js');
const assert = require('chai').assert;

let autoService;
describe('tests', function () {

    describe('constructor test', function () {
        beforeEach(function () {
            autoService = new AutoService(5);

            it('instantiation test', function () {
                assert.equal(autoService.garageCapacity, 5);
            });

            it('should have empty array', function () {
                assert.isarray(autoService.workInProgress);
                autoService.workInProgress.should.be.empty();
            });

            it('should have empty array', function () {
                assert.isarray(autoService.backlogWork);
                autoService.backlogWork.should.be.empty();
            })
        })
    });
});
