function solve() {

    let sequence = document.getElementById('str').value;
    let resultElement = document.getElementById('result');
    let countOfOnes = 0;

    // for (let num of sequence){
    //
    //     if(num == '1'){
    //         countOfOnes++;
    //     }
    // }

    //let sum = 0;
   // let numbers = String(countOfOnes).split('');

    let sum = sequence.split('')
        .filter(x => x == '1')
        .reduce((a, b) => +a + +b);

    while (sum > 9) {
        sum = +(String(sum).split('').reduce((a, b) => +a + +b));
    }

    //for (let num of numbers) {

      //  sum += parseInt(num);

       // if(String(sum).split('').length > 1){

       //     sum += parseInt()
       // }
  //  }

    console.log(sum);

    let newSeq = sequence.slice(sum, sequence.length - sum);

    console.log(newSeq);

    let matches = newSeq.match(/[0-1]{8}/g);

    let asciiCodes = [];

    for (let match of matches){

        asciiCodes.push(parseInt(match, 2));
    }

    let resultString = '';

    for (let asciiCode of asciiCodes){

        let ch = String.fromCharCode(asciiCode);

        if(isLetter(ch)){

            resultString += ch;

        }
    }

    resultElement.textContent = resultString;
    document.getElementById('str').value = '';

    function isLetter(str) {
        return str.length === 1 && str.match(/[a-z]|[ ]/i);
    }
}

