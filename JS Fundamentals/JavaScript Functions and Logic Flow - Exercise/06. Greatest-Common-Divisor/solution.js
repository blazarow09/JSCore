function greatestCD() {

    function GreatestCommonDivisor(firstNumber, secondNumber) {
        if (!secondNumber) {
            return firstNumber;
        }

        return GreatestCommonDivisor(secondNumber, firstNumber % secondNumber);
    }

    let firstNum = document.getElementById('num1');
    let secondNum = document.getElementById('num2');
    let resultP = document.getElementById('result');

    resultP.textContent = GreatestCommonDivisor(firstNum.value, secondNum.value);

    firstNum.value = '';
    secondNum.value = '';
}