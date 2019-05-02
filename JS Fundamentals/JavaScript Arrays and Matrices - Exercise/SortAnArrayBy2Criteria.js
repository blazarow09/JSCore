function solve(input) {
    
    let sortedArray = input.sort((a, b) => {
        return a.length - b.length || a.localeCompare(b)
    });

    console.log(sortedArray.join('\n'));
}

solve(['alpha',
    'beta',
    'gamma']
);