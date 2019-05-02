function solve() {

    function loadProducts() {

        let textAreaCmd = document.getElementsByTagName('textarea')[0].value;

        let obj = JSON.parse(textAreaCmd);

        for (let l of obj){

            if(loadedProducts.hasOwnProperty(l.name)){

                loadedProducts[l.name]['price'] = l.price;
                loadedProducts[l.name]['quantity'] += l.quantity;
            } else {

                loadedProducts[l.name] = {'price': l.price, 'quantity': l.quantity};
            }

            document.getElementsByTagName('textarea')[2].textContent +=
            `Successfully added ${l.quantity} ${l.name}. Price: ${l.price}\n`;
        }

    }
    function buyProducts() {

        let textAreaToBuy = document.getElementsByTagName('textarea')[1].value;

        let obj = JSON.parse(textAreaToBuy);

        if(loadedProducts.hasOwnProperty(obj.name)
            && loadedProducts[obj.name]['quantity'] >= obj.quantity){

            loadedProducts[obj.name]['quantity'] -= obj.quantity;
            profit += obj.quantity * loadedProducts[obj.name]['price'];

            document.getElementsByTagName('textarea')[2].textContent += `${obj.quantity} ${obj.name} sold for ${obj.quantity * loadedProducts[obj.name]['price']}.\n`;
        } else {
            document.getElementsByTagName('textarea')[2].textContent += 'Cannot complete order.\n';
        }
    }
    function end() {
        document.getElementsByTagName('textarea')[2].textContent += `Profit: ${profit.toFixed(2)}.\n`
        loadButton.removeEventListener('click', loadProducts);
        buyButton.removeEventListener('click', buyProducts);
        ondragend.removeEventListener('click', end);
    }

    let loadButton = document.querySelector('#exercise button');
    let buyButton = document.querySelectorAll('#exercise button')[1];
    let endButton = document.querySelectorAll('#exercise button')[2];
    let loadedProducts = {};
    let profit = 0;

    loadButton.addEventListener('click', loadProducts);
    buyButton.addEventListener('click', buyProducts);
    endButton.addEventListener('click', end);
}