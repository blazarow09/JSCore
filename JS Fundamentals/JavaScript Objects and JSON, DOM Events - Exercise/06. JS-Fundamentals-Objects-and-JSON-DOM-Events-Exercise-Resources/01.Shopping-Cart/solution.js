function solve() {

    function addProduct(e) {

        let product = e.target.parentNode.children[1].textContent;
        let price = e.target.parentNode.children[2].textContent.split(': ')[1];

        products.push({
                'product': product,
                'price': price
            });

        textAreaElement.value += `Added ${product} for ${price} to the cart.\n`;
    }

    function buy() {

        let list = new Set();
        let totalPrice = 0;

        for(let item of products){
            totalPrice += parseFloat(item.price);
            list.add(item['product']);
        }

        textAreaElement.value += `You bought ${Array.from(list).join(', ')} for ${totalPrice.toFixed(2)}.\n`;
    }

    let products = [];

    let productsButtons = Array.from(document.querySelectorAll('.product button'));
    let buyButton = document.querySelectorAll('#exercise button')[3];
    let textAreaElement = document.getElementsByTagName('textarea')[0];

    productsButtons.forEach(btn => {
        btn.addEventListener('click', addProduct);
    });

    buyButton.addEventListener('click', buy);
}