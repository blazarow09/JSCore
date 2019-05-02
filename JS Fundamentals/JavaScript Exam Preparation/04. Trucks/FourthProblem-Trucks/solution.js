function solve() {

    function addTruck() {

        let plateNumber = document.querySelector('#newTruckPlateNumber').value;
        let tiresCondition = document.querySelector('#newTruckTiresCondition').value;

        let newTruck = {
            'plateNumber': plateNumber,
            'tiresCondition': tiresCondition.split(' ').filter(Boolean).map(Number),
            'miles': 0
        };

        trucks.push(newTruck);
        let trucksDiv = document.querySelectorAll('fieldset')[4].children[1];
        let newTruckDiv = document.createElement('div');
        newTruckDiv.innerHTML = newTruck.plateNumber;
        newTruckDiv.setAttribute('class', 'truck');
        trucksDiv.appendChild(newTruckDiv);
    }
    function addNewTires() {

        let tiresCondition = document.querySelector('#newTiresCondition').value;

        let newTires = {
            'tiresCondition': tiresCondition.split(' ').filter(Boolean).map(Number)
        };

        tires.push(newTires);

        let tiresDiv = document.querySelectorAll('fieldset')[3].children[1];
        let newTiresDiv = document.createElement('div');
        newTiresDiv.innerHTML = newTires.tiresCondition.join(' ');
        newTiresDiv.setAttribute('class', 'tireSet');
        tiresDiv.appendChild(newTiresDiv);
    }
    function doWork() {

        let plateNumber = document.querySelector('#workPlateNumber').value;
        let distance = document.querySelector('#distance').value;

        let truck = trucks.reduce((prev, curr) => {
            return (curr.plateNumber === plateNumber) ? curr : prev;
        }, null);

        if(truck === null){
            return;
        }

        let conditionNeed = (Math.floor(distance / 1000));
        if(truck.tiresCondition.every(x => x >= conditionNeed)){

            truck.miles += parseInt(distance);
            let newTiresLife = truck.tiresCondition.map(x => x - conditionNeed);
            truck.tiresCondition = newTiresLife;
            return;
        }

        if (!tires.length) {
            return;
        }
        let newTyreComplect = tires.shift();
        let tyresDiv = document.querySelectorAll('fieldset')[3].getElementsByTagName('div')[0];
        let divToRemove = document.getElementsByClassName('tireSet')[0];
        tyresDiv.removeChild(divToRemove);
        let refreshedTires = [];
        let count = 0;
        for (let tire of truck.tiresCondition) {
            tire += newTyreComplect[count];
            refreshedTires.push(tire);
        }
        truck.tiresCondition = refreshedTires;

        let enoughTyresLeft = truck.tiresCondition.every(x => x - conditionNeed >= 0);
        if (enoughTyresLeft) {
            truck.miles += parseInt(distance);
            truck.tiresCondition = truck.tiresCondition.map(x => x - conditionNeed);
            return;
        }
    }
    function endDay() {

        let output = document.querySelector('textarea');

        for (let truck of trucks){

            output.innerHTML += `Truck ${truck.plateNumber} has traveled ${truck.miles}.\n`;
        }

        output.innerHTML += `You have ${tires.length} sets of tires left.\n`;
    }
    
    let trucks = [];
    let tires = [];
    let addTruckButton = document.querySelectorAll('button')[0];
    let addNewTiresButton = document.querySelectorAll('button')[1];
    let workButton = document.querySelectorAll('button')[2];
    let endDayButton = document.querySelectorAll('button')[3];
    
    addTruckButton.addEventListener('click', addTruck);
    addNewTiresButton.addEventListener('click', addNewTires);
    workButton.addEventListener('click', doWork);
    endDayButton.addEventListener('click', endDay);
}