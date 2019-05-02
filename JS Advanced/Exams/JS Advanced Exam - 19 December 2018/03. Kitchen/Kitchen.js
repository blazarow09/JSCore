class Kitchen {

    constructor(budget){
        this.budget = budget;
        this.menu = {};
        this.productsInStock = {};
        this.actionsHistory = [];
    }

    loadProducts(products){

        products.forEach(product => {
            let [productName, productQuantity, productPrice] = product.split(/\s+/);
            let quantity = Number(productQuantity);
            let price = Number(productPrice);

            if (this.budget >= price) {

                this.budget -= price;

                if (this.productsInStock.hasOwnProperty(productName) === false) {
                    this.productsInStock[productName] = 0;
                }

                this.productsInStock[productName] += quantity;
                this.actionsHistory.push(`Successfully loaded ${quantity} ${productName}`)
            } else {

                this.actionsHistory.push(`There was not enough money to load ${quantity} ${productName}`)
            }
        });

        return this.actionsHistory.join('\n');
    }

    addToMenu(meal, productsNeeded, price){

        if(this.menu.hasOwnProperty(meal)){

            return `${meal} is already in our menu, try something different.`;
        }

        price = Number(price);
        this.menu[meal] = {meal, products: productsNeeded, price};

        return `Great idea! Now with the ${meal} we have ${Object.keys(this.menu).length} meals in the menu, other ideas?`;
    }

    showTheMenu(){
        let meals = Object.keys(this.menu);

        if(meals.length === 0){
            return 'Our menu is not ready yet, please come later...';
        }

        return meals.map(meal => `${meal} - $ ${this.menu[meal].price}`).join('\n') + '\n';
    }

    makeTheOrder(meal){

        if(!this.menu.hasOwnProperty(meal)){

            return `There is not ${meal} yet in our menu, do you want to order something else?`;
        }

        let neededProducts = this.menu[meal].products;

        for (const product of neededProducts){

            let [productName, productQuantity] = product.split(/\s+/);
            let quantityNeeded = Number(productQuantity);

            if(!this.productsInStock.hasOwnProperty(productName)|| this.productsInStock[productName] < quantityNeeded){

                return `For the time being, we cannot complete your order (${meal}), we are very sorry...`;
            }
        }

        neededProducts.forEach((product) => {

            let [productName, productQuantity] = product.split(/\s+/);

            this.productsInStock[productName] -= Number(productQuantity);
        });

        let price = this.menu[meal].price;
        this.budget += price;

        return `Your order (${meal}) will be completed in the next 30 minutes and will cost you ${price}.`
    }
}



