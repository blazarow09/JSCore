function solve() {

    function findPassengerName(textToMatch) {

        let pattern = /([ ][A-Z]+[a-z]*[-][A-Z]+[a-z]*[.][-][A-Z]+[a-z]*[ ])|([ ][A-Z]+[a-z]*[-][A-Z]+[a-z]*[ ])/g;

        if (pattern.test(textToMatch)){

            return textToMatch.match(pattern)[0]
                .replace(/-/g, ' ')
                .replace(' ', '')
                .trim();
        }

    }
    function findFlightNumber(textToMatch) {

        let patternFlightNumber = /([ ][A-Z]{1,3}[\d]{1,5}[ ])/g;

        return textToMatch.match(patternFlightNumber)[0]
            .replace(' ', '')
            .trim();
    }
    function findAirportInfo(textToMatch) {

        let patternAirport = /([ ][A-Z]{3}\/[A-Z]{3}[ ])/g;

        return textToMatch.match(patternAirport)[0]
            .replace(' ', '')
            .trim();
    }
    function findCompany(textToMatch) {

        let patternCompany = /([-][ ][A-Z]{1}[a-z]*[*][A-Z]{1}[a-z]*[ ])/g;

        return textToMatch.match(patternCompany)[0]
            .replace('- ', '')
            .replace('*', ' ')
            .trim();
    }

    let inputElement = document.getElementById('str');

    let textToMatch = inputElement.value;

    let resultToPrint = document.getElementById('result');

    let cmd = textToMatch
        .split(',')[1]
        .replace(' ' ,'');

    if(cmd === 'name'){

       let name = findPassengerName(textToMatch);

        console.log(name);

        resultToPrint.textContent = `Mr/Ms, ${name}, have a nice flight!`;
   } else if(cmd === 'flight'){

       let flightNumber = findFlightNumber(textToMatch);

       let airports = findAirportInfo(textToMatch).split('/');

       resultToPrint.textContent = `Your flight number ${flightNumber} is from ${airports[0]} to ${airports[1]}.`;
   } else if(cmd === 'company'){

       let company = findCompany(textToMatch);

       resultToPrint.textContent = `Have a nice flight with ${company}.`;
   } else if(cmd === 'all'){

       let name = findPassengerName(textToMatch);
       let flightNumber = findFlightNumber(textToMatch);
       let airports = findAirportInfo(textToMatch).split('/');
       let company = findCompany(textToMatch);

       resultToPrint.textContent = `Mr/Ms, ${name}, your flight number ${flightNumber} is from ${airports[0]} to ${airports[1]}. Have a nice flight with ${company}.`;
   }

   inputElement.value = '';
}

