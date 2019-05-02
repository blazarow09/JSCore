function solve() {

    let buttons = Array.from(document.getElementsByTagName('button'));
    let resultElement = Number(document.getElementById('output'));
    
    buttons.forEach((b) => {
        if(b.textContent === 'Chop') {
            b.addEventListener('click', chopFunc)
        } else if (b.textContent === 'Dice'){
            b.addEventListener('click', () => {
                console.log('Dice');
            })
        } else if (b.textContent === 'Spice'){
            b.addEventListener('click', () => {
                console.log('Spice');
            })
        } else if (b.textContent === 'Bake') {
            b.addEventListener('click', () => {
                console.log('Bake');
            });

        } else if (b.textContent === 'Fillet') {
            b.addEventListener('click', () => {
                console.log('Fillet');
            });
        }});
    
    function chopFunc() {
        let number = Number(document.getElementsByTagName('input')[0].value);
        if (resultElement.textContent) {
            resultElement.textContent /= 2;
        } else {
            resultElement.textContent = number / 2;
        }
    }
    function diceFunc() {
        
    }
    function spiceFunc() {
        let number = Number(document.querySelector('#exercise input').value);
        if (resultElement.textContent) {
            resultElement.textContent = Number(resultElement.textContent) + 1;
        } else {
            resultElement.textContent = Number(number + 1);
        }
    }
    function bakeFunc() {
        
    }
    function filletFunc() {
        
    }
    // let chopButton = document.getElementsByTagName('button')[0];
    // let diceButton = document.getElementsByTagName('button')[1];
    // let spiceButton = document.getElementsByTagName('button')[2];
    // let bakeButton = document.getElementsByTagName('button')[3];
    // let filletButton = document.getElementsByTagName('button')[4];
    // let resultParagraph = document.getElementById('output');
    //
    // //document.getElementsByTagName('input')[0].defaultValue = 'kur';
    //
    // let result = 0;
    // let count = 0;
    //
    // chopButton.addEventListener('click', () => {
    //      if(count === 0){
    //         result = document.getElementsByTagName('input')[0].value;
    //         result = result / 2;
    //
    //         count++;
    //     } else {
    //         result = result / 2;
    //     }
    //
    //     resultParagraph.textContent = String(result);
    // });
    // diceButton.addEventListener('click', () => {
    //     if(count === 0){
    //         result = document.getElementsByTagName('input')[0].value;
    //         result = Math.sqrt(result);
    //
    //         count++;
    //     } else {
    //         result = Math.sqrt(result);
    //     }
    //
    //     resultParagraph.textContent = String(result);
    // });
    // spiceButton.addEventListener('click', () => {
    //     if(count === 0){
    //         result = document.getElementsByTagName('input')[0].value;
    //         result += 1;
    //         count++;
    //     } else {
    //         result += 1;
    //     }
    //
    //     resultParagraph.textContent = String(result);
    // });
    // bakeButton.addEventListener('click', () => {
    //     if(count === 0){
    //         result = document.getElementsByTagName('input')[0].value;
    //         result *= 3;
    //         count++
    //     } else {
    //         result *= 3;
    //     }
    //
    //     resultParagraph.textContent = String(result);
    // });
    // filletButton.addEventListener('click', () => {
    //     if(count === 0){
    //         result = document.getElementsByTagName('input')[0].value;
    //         result -= (result * 20) / 100;
    //         count++
    //     } else {
    //         result -= (result * 20) / 100;
    //
    //     }
    //
    //     resultParagraph.textContent = String(result);
    // });
}
