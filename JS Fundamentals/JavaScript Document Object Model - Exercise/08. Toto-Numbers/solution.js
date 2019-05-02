function solve() {
    let numbersElement = document.getElementsByTagName('input')[0];
	let button = document.getElementsByTagName('button')[0];

	    button.addEventListener('click', () => {

            let numbers = numbersElement.value.trim().split(' ');
            let resultNumbers = document.getElementById('allNumbers');

            for (let i = 0; i < numbers.length; i++){

                if(numbers[i] < 1 || numbers[i] > 49){
                    return;
                }
            }

            if(numbers.length === 6){
                for(let i = 1; i <= 49; i++){
                    let newDiv = document.createElement('div');
                    newDiv.textContent = i;
                    newDiv.className = 'numbers';

                    if(numbers.includes(String(i))){
                        newDiv.style.backgroundColor = 'orange';
                    }

                    resultNumbers.appendChild(newDiv);
                }

                numbersElement.disabled = true;
                button.disabled = true;
            }
        })
}