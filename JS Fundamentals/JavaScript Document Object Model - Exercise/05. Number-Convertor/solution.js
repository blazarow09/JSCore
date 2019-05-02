function solve() {
    var inputElement = document.getElementById('input');
    var selectElement = document.getElementById('selectMenuTo');
    let button = document.getElementsByTagName('button')[0];

    button.addEventListener('click', convert);

    let option = document.createElement('option');
    option.text = 'binary';
    selectElement.add(option);

    option = document.createElement('option');
    option.text = 'hexadecimal';
    selectElement.add(option);

    let result = document.getElementById('result');

    function convert() {
        if(selectElement.value === 'binary'){
            result.value = decToBin(inputElement.value);
        } else {
            result.value =  decToHex(inputElement.value)
        }
    }

    function decToBin(number) {
        return (number >>> 0).toString(2);
    }

    function decToHex(number) {
        return parseInt(number).toString(16).toUpperCase();
    }
}