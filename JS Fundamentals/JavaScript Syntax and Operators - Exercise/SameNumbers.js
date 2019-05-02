function f(number) {
    number = number.toString();
    let firstDigit = parseInt(number[0]);
    let sum = firstDigit;
    let isSame = true;

   for (let i = 1; i < number.length; i++){
       let nextNumber = number[i];
       sum += parseInt(nextNumber);

       if(firstDigit != nextNumber){
           isSame = false;
       }
   }

    return console.log(`${isSame}\n${sum}`);
}

f(1234);