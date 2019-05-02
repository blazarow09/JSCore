function solve() {
    function findAllFactors(number) {
        var factors=[],i;

        for (i=1;i<=number;i++) {
            if (number%i === 0) {
                factors.push(i);
            }
        }

        return factors;
    }

    let num = document.getElementById('num');

    let spanResult = document.getElementById('result');

    spanResult.innerHTML = findAllFactors(num.value).join(' ');
}

