function solve(arr) {

    let rowSum = 0;

    for (let row = 0; row < arr.length; row++){

        let currentRowSum = 0;

        for (let col = 0; col < arr[row].length; col++){

            currentRowSum += arr[row][col];
        }

        if(row === 0){

            rowSum += currentRowSum;
        } else if (rowSum !== currentRowSum){

            return false;
        }

    }

    for (let col = 0; col < arr[0].length; col++){

        let colSum = 0;

        for (let row = 0; row < arr.length; row++){
            colSum += arr[row][col];
        }

        if(colSum !== rowSum){

            return false;
        }
    }

    return true;
}

console.log(solve([
    [4, 5, 6],
    [6, 5, 4],
    [5, 5, 5]
]));