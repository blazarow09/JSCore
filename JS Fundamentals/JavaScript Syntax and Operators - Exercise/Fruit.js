function f(fruitType, weight, money) {
    let weightInGr = weight / 1000;
    let moneyNeed = weightInGr * money;

    return `I need ${moneyNeed.toFixed(2)} leva to buy ${weightInGr.toFixed(2)} kilograms ${fruitType}.`;
}

console.log(f("orange", 2500, 1.80));