function acceptance() {

    let [company, product, quantity, scrape] = $('#fields input');
    let warehouse = $('#warehouse');

    if(company.value !== '' && product.value !== ''
        && !isNaN(+quantity.value) && !isNaN(+scrape.value)){

        let availableQuantity = +quantity.value - +scrape.value;

        if(availableQuantity > 0){

            let resultText = `[${company.value}] ${product.value} - ${availableQuantity} pieces`;

            let divElement = $('<div>');

            let pElement = $('<p>');
            pElement.text(resultText);

            let button = $('<button>');
            button.attr('type', 'button');
            button.text('Out of stock');
            button.on('click', () => {
                divElement.remove();
            });

            divElement.append(pElement).append(button);
            warehouse.append(divElement);
        }
    }

    company.value = '';
    product.value = '';
    quantity.value = '';
    scrape.value = '';

}