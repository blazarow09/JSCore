function solve(input) {

    let biggestNum = input[0];
    let resultArray = [];

    resultArray.push(biggestNum);

    for (let i = 1; i <= input.length; i++){

        if(biggestNum <= input[i]){

            biggestNum = input[i];
            resultArray.push(biggestNum)
        }
    }

    console.log(resultArray.join('\n'));
}

solve([1,
    2,
    3,
    4]
);