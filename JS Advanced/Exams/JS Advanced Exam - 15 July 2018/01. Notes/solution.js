function addSticker() {

    let titleInputElement = $('.title-input input');
    let textInputElement = $('.text-input input');
    let stickerList = $('#sticker-list');

    if(titleInputElement.val() && textInputElement.val()){

        let liElement = $('<li>').addClass('note-content');

        let aElement = $('<a>').addClass('button');
        aElement.text('x');
        aElement.on('click', ()=> liElement.remove());

        let h2Element = $('<h2>').text(titleInputElement.val());

        let hrElement = $('<hr>');

        let pElement = $('<p>').text(textInputElement.val());

        liElement.append(aElement)
            .append(h2Element)
            .append(hrElement)
            .append(pElement);

        stickerList.append(liElement);

        clearInputFields(titleInputElement, textInputElement);
    }

    function clearInputFields(title, text) {

        title.val('');
        text.val('');
    }
}

