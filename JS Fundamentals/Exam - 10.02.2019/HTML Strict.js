function solve(input) {

    let pesho = '';
    let pattern = /^<(\w+?)>(.+)(<\/\1>)$/;

    for (let line = 0; line < input.length ; line++){

        if(pattern.test(input[line])){

            pesho += input[line].replace(/<[^>]+>/g, '') + ' ';
        }
    }

    console.log(pesho.trim());
}

solve(['<div><p>This</p> is</div>',
    '<div><a>perfectly</a></div>',
    '<divs><p>valid</p></divs>',
    '<div><p>This</div></p>',
    '<div><p>is not</p><div>']
);
//<[^>]+>/g