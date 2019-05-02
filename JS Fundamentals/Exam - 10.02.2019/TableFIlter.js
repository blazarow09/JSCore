function solve(input,cmd){

    let commandName = cmd.split(' ')[0];

    let header = cmd.split(' ')[1];

    let headers = input[0];

    let colIndex = headers.indexOf(header);

    if(commandName === 'sort'){

        let col = [];

        let resultMatrix = [];
        resultMatrix[0] = input[0];
        for (let row = 1; row < input.length; row++) {

            col.push(input[row][colIndex])
        }

        col.sort((a,b) => {
            return a.localeCompare(b)
        });

        for (let i = 0; i < col.length; i++) {

            for (let j = 1; j < input.length; j++) {

                let temp = col[i];
                let temp1 = input[j][colIndex];
                if(temp === temp1){

                    resultMatrix.push(input[j])
                }
            }
        }

        for (let row of resultMatrix) {

            console.log(row.join(' | '))
        }
    } else if (commandName === 'hide'){

        for (let row = 0; row < input.length; row++) {

            input[row].splice(colIndex,1);
            console.log(input[row].join(' | '));
        }
    } else if (commandName === 'filter'){

        let cmdVal = cmd.split(' ')[2];

        console.log(input[0].join(' | '));
        for (let row = 0; row < input.length; row++) {

            if(input[row][colIndex] === cmdVal){

                console.log(input[row].join(' | '));
            }
        }
    }
}