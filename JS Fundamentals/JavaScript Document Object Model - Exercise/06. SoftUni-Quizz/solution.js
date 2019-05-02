function solve() {
	let buttonNext1 = document.getElementsByTagName('button')[0];
	let buttonNext2 = document.getElementsByTagName('button')[1];
	let buttonResult = document.getElementsByTagName('button')[2];

	let question2Section = document.getElementsByClassName('hidden')[0];
	let question3Section = document.getElementsByClassName('hidden')[1];

	let resultElement = document.getElementById('result');
	let rightAnswers = 0;

	buttonNext1.addEventListener('click', () => {

	    let rightAnswer = document.getElementsByTagName('input')[1];

	    if(rightAnswer.checked){
	        rightAnswers++;
        }

        question2Section.style.display = 'block';
    });
	buttonNext2.addEventListener('click', () => {

	    let rightAnswer = document.getElementsByTagName('input')[6];

	    if(rightAnswer.checked){
	        rightAnswers++;
        }

	    question3Section.style.display = 'block';
    });
	buttonResult.addEventListener('click', () => {

        let rightAnswer = document.getElementsByTagName('input')[11];

        if(rightAnswer.checked){
            rightAnswers++;
        }

        if(rightAnswers === 3){
            resultElement.textContent = 'You are recognized as top SoftUni fan!';
        } else {
            resultElement.textContent = `You have ${rightAnswers} right answers`;
        }
    })
}