function onlineShop(selector) {
    let form = `<div id="header">Online Shop Inventory</div>
<div class="block">
    <label class="field">Product details:</label>
    <br>
    <input placeholder="Enter product" class="custom-select">
    <input class="input1" id="price" type="number" min="1" max="999999" value="1"><label class="text">BGN</label>
    <input class="input1" id="quantity" type="number" min="1" value="1"><label class="text">Qty.</label>
    <button id="submit" class="button" disabled>Submit</button>
    <br><br>
    <label class="field">Inventory:</label>
    <br>
    <ul class="display">
    </ul>
    <br>
    <label class="field">Capacity:</label>
    <input id="capacity" readonly>
    <label class="field">(maximum capacity is 150 items.)</label>
    <br>
    <label class="field">Price:</label>
    <input id="sum" readonly>
    <label class="field">BGN</label>
</div>`;
    $(selector).html(form);

    const maxCapacity = 150;
    let submitBtn = $('#submit');
    let inventory = $('.display');
    let productElement = $('.custom-select');
    let priceElement = $('#price');
    let quantityElement = $('#quantity');
    let capacityElement = $('#capacity');
    let sumElement = $('#sum');

   productElement.on('input', () => {

       let isEmpty = $('.custom-select').val() === '';

           submitBtn.prop('disabled', isEmpty);

   });

   submitBtn.on('click', onClickEvent);

    function onClickEvent() {

        if(productElement.val() && priceElement.val() && quantityElement.val()){

            let quantity = Number(quantityElement.val());
            let capacity = Number(capacityElement.val());
            let total = capacity + quantity;

            if(total < maxCapacity){

                createAndAddToInventory(productElement, priceElement, quantityElement);

                capacityElement.val(total);
                let currentSum = Number(sumElement.val());
                let price = Number(priceElement.val());
                let totalSum = currentSum + price;

                sumElement.val(totalSum)
            } else {

                disableInterface()
            }

            clearInputFields(productElement, priceElement, quantityElement);
        }
    }

    function disableInterface() {
        productElement.prop('disabled',true);
        priceElement.prop('disabled', true);
        quantityElement.prop('disabled', true);
        submitBtn.prop('disabled', true);
        capacityElement.addClass('fullCapacity');
        capacityElement.val('full')

    }
    function createAndAddToInventory(productElement, priceElement, quantityElement) {

        let liElement = $('<li>');

        let pElement = $('<p>').text(`Product: ${productElement.val()} Price: ${priceElement.val()} Quantity: ${quantityElement.val()}`);

        liElement.append(pElement);

        inventory.append(liElement);
    }
    function clearInputFields(product, price, quantity) {

        product.val('');
        price.val(1);
        quantity.val(1);
    }
}