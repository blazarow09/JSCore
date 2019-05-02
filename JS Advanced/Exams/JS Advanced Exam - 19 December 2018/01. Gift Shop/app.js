function solution() {

    let shop = $('#christmasGiftShop');

        let toyType = $('#toyType');
        let toyPrice = $('#toyPrice');
        let toyDescription = $('#toyDescription');

        if(toyType.val() !== '' && !isNaN(+toyPrice.val()) && toyDescription.val()) {

            let div = $('<div>');
            div.addClass('gift');

            let img = $('<img>');
            img.attr('src', 'gift.png');

            let h2 = $('<h2>');
            h2.text(toyType.val());

            let pElement = $('<p>');
            pElement.text(toyDescription.val());

            let buyButton = $('<button>');
            buyButton.text(`Buy it for $${toyPrice.val()}`);
            buyButton.on('click', () => div.remove());

div.append(img).append(h2).append(pElement).append(buyButton);

            shop.append(div);
        }

    toyType.val('');
    toyPrice.val('');
    toyDescription.val('');
}