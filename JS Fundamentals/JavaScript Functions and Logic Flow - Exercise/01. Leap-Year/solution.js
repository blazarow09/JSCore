function leapYear() {
    function checkLeapYear(year)
    {
        return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);
    }

    let button = document.getElementsByTagName('button')[0];

    button.addEventListener('click', () => {
        let year = document.getElementsByTagName('input')[0];
        let resultElement = document.getElementById('year');

        let h2Element = resultElement.getElementsByTagName('h2')[0];
        let divElement = resultElement.getElementsByTagName('div')[0];

        if(checkLeapYear(year.value)){

            h2Element.textContent = 'Leap Year';
            divElement.textContent = `${year.value}`;

        } else {

            h2Element.textContent = 'Not Leap Year';
            divElement.textContent = `${year.value}`;

        }

        year.value = '';
    });
}