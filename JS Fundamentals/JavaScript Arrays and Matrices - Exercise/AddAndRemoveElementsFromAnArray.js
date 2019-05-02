function solve(input) {

    let resultArray = [];
    let number = 1;

    for (let cmd of input){

        if(cmd === 'add'){

            resultArray.push(number++);
        } else if (cmd === 'remove'){

            number++;

            if(resultArray.length > 0){
                resultArray.pop();
            }
        }
    }

    if(resultArray.length < 1){

        resultArray.push('Empty');
        console.log(resultArray.join(''));
    }
    else {

        console.log(resultArray.join('\n'));
    }
}

solve(['add',
    'add',
    'remove',
    'add',
    'add']
);