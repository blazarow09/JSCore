function subtract() {
    let firstValue = Number(document.querySelector('#firstNumber').value);
    let secondValue = Number(document.querySelector('#secondNumber').value);
    document.querySelector('#result').textContent = firstValue - secondValue;
}