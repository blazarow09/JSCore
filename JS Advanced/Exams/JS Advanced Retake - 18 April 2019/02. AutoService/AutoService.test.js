const AutoService = require('./AutoService');
const assert = require('chai').assert;

describe('Tests', function () {

    describe('constructor test', function () {
        it('instantiation test', function () {
            let autoService = new AutoService(5);
            assert.equal(autoService.garageCapacity, 5);
            assert.typeOf(autoService.workInProgress, 'array');
            assert.typeOf(autoService.backlogWork, 'array');
        });
    });

    describe('capacity test', function () {
        it('should return proper capacity', function () {
            let autoService = new AutoService(4);

            autoService.signUpForReview('Bobi', 'CA1234CA', {'engine':'bobi1234', 'transmission':'bobi4321', 'doors':'broken'});
            autoService.signUpForReview('Bobi', 'CA1234CA', {'engine':'bobi1234', 'transmission':'bobi4321', 'doors':'broken'});
            autoService.signUpForReview('Bobi', 'CA1234CA', {'engine':'bobi1234', 'transmission':'bobi4321', 'doors':'broken'});

            assert.equal(autoService.availableSpace, 1)
        });
    });

    describe('signup for review test', function () {
        it('should sign up ', function () {
            let autoService = new AutoService(5);

            autoService.signUpForReview('Bobi', 'CA1234CA', {'engine':'bobi1234', 'transmisson':'bobi4321', 'doors':'broken'});

            let workIn = autoService.workInProgress;

            assert.equal(JSON.stringify(workIn[0]), "{\"plateNumber\":\"CA1234CA\",\"clientName\":\"Bobi\",\"carInfo\":{\"engine\":\"bobi1234\",\"transmisson\":\"bobi4321\",\"doors\":\"broken\"}}");
        });

        it('should be added in backlog', function () {
            let autoService = new AutoService(1);

            autoService.signUpForReview('Bobi', 'CA1234CA', {'engine':'bobi1234', 'transmission':'bobi4321', 'doors':'broken'});

            autoService.signUpForReview('Pesho', 'CA1234CA', {'engine':'bobi1234', 'transmission':'bobi4321', 'doors':'broken'});
            let backlog = autoService.backlogWork;
            assert.equal(JSON.stringify(backlog[0]), '{"plateNumber":"CA1234CA","clientName":"Pesho","carInfo":{"engine":"bobi1234","transmission":"bobi4321","doors":"broken"}}')
        })
    });

    describe('car info test', function () {
        it('should return carInfo', function () {
            let autoService = new AutoService(5);

            autoService.signUpForReview('Bobi', 'EH7682KM', {'engine':'bobi1234', 'transmission':'bobi4321', 'doors':'broken'});

            let info = autoService.carInfo('EH7682KM', 'Bobi');

            assert.equal(JSON.stringify(info), '{"plateNumber":"EH7682KM","clientName":"Bobi","carInfo":{"engine":"bobi1234","transmission":"bobi4321","doors":"broken"}}')
        });

        it('should return carInfo from backlog', function () {
            let autoService = new AutoService(2);

            autoService.signUpForReview('Bobi', 'EH7682KM', {'engine':'bobi1234', 'transmission':'bobi4321', 'doors':'broken'});
            autoService.signUpForReview('Bobi', 'EH7682KM', {'engine':'bobi1234', 'transmission':'bobi4321', 'doors':'broken'});
            autoService.signUpForReview('Bobi', 'EH7782KM', {'engine':'bobi1234', 'transmission':'bobi4321', 'asd':'broken'});

            let info = autoService.carInfo('EH7782KM', 'Bobi');

            assert.equal(JSON.stringify(info), '{"plateNumber":"EH7782KM","clientName":"Bobi","carInfo":{"engine":"bobi1234","transmission":"bobi4321","asd":"broken"}}')
        });

        it('should throw error with invalid car number', function () {
           let autoService = new AutoService(5);

           let plateNumber = 'EH7682KM';
           let clientName = 'Bobi';

            assert.equal(autoService.carInfo(plateNumber, clientName), `There is no car with platenumber ${plateNumber} and owner ${clientName}.`);
        });
    });

    describe('repair car tests', function () {
        it('should repair first car', function () {
            let autoService = new AutoService(5);

            autoService.signUpForReview('Bobi', 'EH7682KM', {'engine':'bobi1234', 'transmission':'bobi4321', 'doors':'broken'});
            autoService.signUpForReview('Bobi', 'EH7682KM', {'engine':'bobi1234', 'transmission':'bobi4321', 'doors':'broken'});

            let actual = autoService.repairCar();

            assert.equal(actual, 'Your doors were repaired.')
        });

        it('no broken parts', function () {
            let autoService = new AutoService(5);

            autoService.signUpForReview('Bobi', 'EH7682KM', {'engine':'bobi1234', 'transmission':'bobi4321', 'doors':'zdravi sa'});

            autoService.signUpForReview('Bobi', 'EH7682KM', {'engine':'bobi1234', 'transmission':'bobi4321', 'doors':'zdravi sa'});

            let actual = autoService.repairCar();

            assert.equal(actual, 'Your car was fine, nothing was repaired.')
        });

        it('no clients', function () {
            let autoService = new AutoService(5);

            let actual = autoService.repairCar();

            assert.equal(actual, 'No clients, we are just chilling...')
        });

        it('should check backlog array for broken cars', function () {
            let autoService = new AutoService(2);

            autoService.signUpForReview('Bobi', 'EH7682KM', {'engine':'bobi1234', 'transmission':'bobi4321', 'doors':'Zdravi a'});
            autoService.signUpForReview('Ivan', 'EH7682KM', {'engine':'bobi1234', 'transmission':'bobi4321', 'nakladki':'Zdravi sa'});
            autoService.signUpForReview('Ivan', 'EH7682KM', {'engine':'bobi1234', 'transmission':'bobi4321', '4ista4ki':'Zdravi sa'});

            autoService.repairCar();
            autoService.repairCar();

            let actual = autoService.repairCar();

            assert.equal(actual, 'Your car was fine, nothing was repaired.')
        });

        it('should repair car for backlog array', function () {
            let autoService = new AutoService(2);

            autoService.signUpForReview('Bobi', 'EH7682KM', {'engine':'bobi1234', 'transmission':'bobi4321', 'doors':'Zdravi a'});
            autoService.signUpForReview('Ivan', 'EH7682KM', {'engine':'bobi1234', 'transmission':'bobi4321', 'nakladki':'Zdravi sa'});
            autoService.signUpForReview('Ivan', 'EH7682KM', {'engine':'bobi1234', 'transmission':'bobi4321', '4ista4ki':'broken'});

            autoService.repairCar();
            autoService.repairCar();

            let actual = autoService.repairCar();

            assert.equal(actual, 'Your 4ista4ki were repaired.')
        });
    });
});