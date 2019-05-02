function solve() {

    function filter() {
        let input = document.querySelector('#input').value;
        let secondaryCmd = document.querySelector('#filterSecondaryCmd').value;
        let position = document.querySelector('#filterPosition').value;
        console.log(secondaryCmd);
        if(secondaryCmd === 'uppercase'){

            let pattern = /[A-Z]/g;

            output.innerHTML += input.match(pattern)[Number(position) - 1];

        } else if (secondaryCmd === 'lowercase'){

            let pattern = /[a-z]/g;

            output.innerHTML += input.match(pattern)[Number(position) - 1];
        } else if (secondaryCmd === 'nums'){

            let pattern = /[0-9]/g;

            output.innerHTML += input.match(pattern)[Number(position) - 1];
        }
    }
    function get() {
        let input = document.querySelector('#input').value;
        let position = document.getElementById('getPosition').value;

            output.innerHTML += input.split('')[Number(position) - 1];
    }
    function sort() {
        let input = document.querySelector('#input').value;
        let position = Number(document.getElementById('sortPosition').value);
        let secondaryCmd = document.getElementById('sortSecondaryCmd').value;

        if(secondaryCmd === 'A'){

            output.innerHTML += input.split('').sort()[position - 1];
        } else if( secondaryCmd === 'Z'){

            output.innerHTML += input.split('').sort().reverse()[position - 1];;
        }
    }
    function rotate() {
        let input = document.querySelector('#input').value;
        let secondaryCmd = Number(document.getElementById('rotateSecondaryCmd').value);
        let position = Number(document.getElementById('rotatePosition').value);
        let arr = input.split('');

        for (let i = 1; i <= secondaryCmd; i++){

            let lastEl = arr[arr.length -1];
            arr.splice(1, 0, lastEl);
            arr.splice(arr.length, 1);
        }
        output.innerHTML += arr[position - 1];
    }

    let output = document.querySelector('#output > p');
    document.querySelectorAll('button')[0].addEventListener('click', filter);
    document.querySelectorAll('button')[3].addEventListener('click', get);
    document.querySelectorAll('button')[1].addEventListener('click', sort);
    document.querySelectorAll('button')[2].addEventListener('click', rotate);
}