function gcb(firstNumber, secondNumber) {
    if ( ! secondNumber) {
        return firstNumber;
    }

    return gcb(secondNumber, firstNumber % secondNumber);
}

console.log(gcb(2000, 1000));