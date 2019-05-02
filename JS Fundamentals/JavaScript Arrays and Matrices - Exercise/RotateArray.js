function solve(input) {

    let count = input.pop();
    let counter = 1;
    count %= input.length;

    //for (let i = 1; i <= count; i++){
   while (counter <= count) {

        let lastElement = input[input.length - 1];
        input.unshift(lastElement);
        input.pop();

        counter++
    }

    console.log(input.join(' '));
}

solve(['Banana',
    'Orange',
    'Coconut',
    'Apple',
    '15']
);

