function solve(input) {

    let delimiter = input.pop();
    let result = input[0];

    for (let i = 1; i < input.length; i++){
        result += delimiter + input[i];
    }

    console.log(result)
}

solve(['One',
    'Two',
    'Three',
    'Four',
    'Five',
    '-']
);