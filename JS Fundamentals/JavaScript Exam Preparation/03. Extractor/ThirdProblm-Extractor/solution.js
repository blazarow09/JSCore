function solve() {

    function extract() {
        let input = document.querySelector('#input').value;

        let pattern = /(^[0-9]+)/;

        let countToTake = input.match(pattern)[0];

        input = input.slice(countToTake.length, input.length);

        if(countToTake > input.length){
            countToTake = input.length;
        }

        let takenElements = '';

        for (let i = 0; i < countToTake; i++){

            takenElements += input[i];
        }

        let splitter = takenElements[takenElements.length - 1];

        takenElements = takenElements.split(splitter);

        let regPattern = new RegExp('[^' + takenElements[0] + ']', 'g');
        let elements = takenElements[1].match(regPattern);

        elements = elements.join('').replace(/[#]/g,' ');

        output.innerHTML = elements;
    }

    let output = document.querySelector('#output');
    document.querySelector('button').addEventListener('click', extract);
}