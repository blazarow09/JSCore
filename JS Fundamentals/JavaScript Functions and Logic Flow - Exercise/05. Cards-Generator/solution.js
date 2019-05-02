function solve() {

    let button = document.getElementsByTagName('button')[0];

    button.addEventListener('click', () => {

        let from = document.getElementById('from');
        let to = document.getElementById('to');
        let selectedElement = document.getElementsByTagName('select')[0].value.slice(-1);

        let cardsValues = [2,3,4,5,6,7,8,9,10,'J','Q','K','A'];

        if(from.value === 'J') {from.value = 11}
        else if(from.value === 'Q') { from.value = 12}
        else if(from.value === 'K') { from.value = 13}
        else if(from.value === 'A') { from.value = 14}

        if(to.value === 'J') {to.value = 11}
        else if(to.value === 'Q') {to.value = 12}
        else if(to.value === 'K') {to.value = 13}
        else if(to.value === 'A') {to.value = 14}

        for(let i = from.value - 2; i <= to.value - 2; i++){

            let cardsSection = document.getElementById('cards');
            let divCard = document.createElement('div');
            let upperP = document.createElement('p');
            let middleP = document.createElement('p');
            let bottomP = document.createElement('p');


            upperP.textContent = selectedElement;
            middleP.textContent = cardsValues[i];
            bottomP.textContent = selectedElement;

            divCard.appendChild(upperP);
            divCard.appendChild(middleP);
            divCard.appendChild(bottomP);

            divCard.className = 'card';

            cardsSection.appendChild(divCard);
        }

        from.value = '';
        to.value = '';
    })
}