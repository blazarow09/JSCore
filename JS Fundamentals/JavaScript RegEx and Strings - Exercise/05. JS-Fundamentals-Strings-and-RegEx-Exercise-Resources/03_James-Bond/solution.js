function solve(input) {

    function findDegrees(textToSearchIn) {

        let pattern = /(north)(.*?)([0-9]{2})|(east)(.*?)([0-9]{2})/i;

        return pattern.exec(textToSearchIn);
    }
    function findDecimals(textToSearchIn) {

        let pattern = /([0-9]{6})/;

        return pattern.exec(textToSearchIn);
    }
    function findMessage(key,textToSearchIn) {

        let pattern = /(<>)(.+)(<>)/;

        return textToSearchIn.match(pattern)
    }
    let key = '<>';
    let separatedMessage = input.split(',');
    let firstPart = separatedMessage[0];
    let secondPart = separatedMessage[1];
    let thirdPart = separatedMessage[2];

    console.log(separatedMessage);

    let latitude = findDegrees(firstPart)[0]
        .slice(0,5)
        .toLowerCase()
        .trim();

    let degrees = findDegrees(firstPart)[0]
        .slice(-2)
        .trim();

    let decimals = findDecimals(secondPart)[0];

    let firstCoordinates = '';

    if(latitude === 'north'){
        firstCoordinates += degrees + '.' + decimals + ' N';
    } else  if (latitude === 'east'){
        firstCoordinates += degrees + '.' + decimals + ' E';
    }

    let message = findMessage(key, secondPart);

    console.log(message);


}

solve('eaSt 19,432567noRt north east 53,123456north 43,3213454dsNot all those who wander are lost.4dsnorth 47,874532')