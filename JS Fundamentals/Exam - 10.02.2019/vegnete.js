function solve(input) {

    function getMostDrivenModel(vignettes, town) {

        let towns = [];

        for (let el of vignettes) {

            if (el.town === town) {

                towns.push(
                    {
                        modelName: el.model,
                        vignettePrice: el.price,
                        regNumber:el.regNumber,
                        modelOccurrences: 0
                    });
            }
        }

        towns.forEach(function (x) {

            towns.forEach(function (y) {

                if (y.modelName === x.modelName){

                    x.modelOccurrences++;
                }
            })
        });

        towns.sort( function (a,b) {

            if (a.modelOccurrences > b.modelOccurrences) {

                return -1;
            } else if (a.modelOccurrences < b.modelOccurrences) {

                return 1;
            } else {

                if (a.vignettePrice > b.vignettePrice){

                    return -1;
                } else if (a.vignettePrice < b.vignettePrice) {

                    return 1;
                } else {

                    if (a.modelName > b.modelName) {

                        return 1;
                    } else {
                        return -1;
                    }
                }
            }
        });

        return towns[0];
    }
    function findMostProfTown(vignettes) {
        let towns = [];

        for (let el of vignettes) {

            if (towns.some(x => x.townName === el.town)) {

                let index = towns
                    .findIndex(x => x.townName === el.town);
                towns[index].totalProfit += el.price;
                towns[index].vignettesCount += 1;

                continue;
            }

            towns.push({
                townName: el.town,
                totalProfit: el.price,
                vignCount: 1
            });

        }

        towns.sort(function (a, b) {

            if (a.totalProfit > b.totalProfit) {

                return -1;
            }
            else if (a.totalProfit < b.totalProfit){

                return 1;
            }
            else {
                if (a.vignettesCount > b.vignettesCount) {

                    return -1;
                } else if (a.vignettesCount < b.vignettesCount) {

                    return 1;
                } else {

                    if (a.townName > b.townName) {

                        return 1;
                    } else {

                        return -1;
                    }
                }
            }
        });

        return towns[0];
    }

    let mostProfitTown = findMostProfTown(input);
    let mostDrivenModel = getMostDrivenModel(input, mostProfitTown.townName);

    input.sort(function (a,b) {

        if (a.town > b.town){

            return 1;
        } else if (a.town < b.town) {

            return -1;
        } else {

            if (a.regNumber > b.regNumber){

                return 1;
            } else {
                return -1;
            }
        }
    });

    let arr = new Map();

    for (const model of input ) {

        if (model.model === mostDrivenModel.modelName) {

            if (arr.has(model.town)){

                arr
                    .get(model.town)
                    .push(model.regNumber);

                continue;
            }

            arr.set(model.town, [model.regNumber])
        }
    }

    console.log(`${mostProfitTown.townName} is most profitable - ${mostProfitTown.totalProfit} BGN`);
    console.log(`Most driven model: ${mostDrivenModel.modelName}`);

    for (let [key] of arr) {

        console.log(`${key}: ${arr.get(key).join(', ')}`)
    }

}

/*
solve([{model: 'BMW', regNumber: 'B1234SM', town: 'Varna', price: 2},
    {model: 'BMW', regNumber: 'C5959CZ', town: 'Sofia', price: 8},
    {model: 'Tesla', regNumber: 'NIKOLA', town: 'Burgas', price: 9},
    {model: 'BMW', regNumber: 'A3423SM', town: 'Varna', price: 3},
    {model: 'Lada', regNumber: 'SJSCA', town: 'Sofia', price: 3}]
);*/
