function makeReservation() {

    let fullNameElement = $('#fullName');
    let emailElement = $('#email');
    let phoneNumberElement = $('#phoneNumber');
    let addressElement = $('#address');
    let postalCodeElement = $('#postalCode');

    let submitBtn = $('#submit');
    let editBtn = $('#edit');
    let continueBtn = $('#continue');
    let infoPreview = $('#infoPreview');
    let container = $('#container');

    submitBtn.on('click', readReservationInfo);
    editBtn.on('click', fillEditForm);
    continueBtn.on('click', proceedAction);

    function proceedAction() {

        submitBtn.prop('disabled', true);
        editBtn.prop('disabled', true);
        continueBtn.prop('disabled', true);

        let h2Element = $('<h2>').text('Payment details');

        let selectElement = $('<select>').addClass('custom-select');
        selectElement.attr('id', 'paymentOptions');
        //let defaultOptionn = new Option('Choose');

        let creditCardOpt = new Option('Credit Card', 'creditCard');

        let bankTransOpt = new Option('Bank Transfer', 'bankTransfer');

        let defaultOption = $('<option>').text('Choose').prop('disabled', true);
        defaultOption.attr('selected', '');
        defaultOption.prop('hidden', true);

        selectElement.append(defaultOption).append(creditCardOpt).append(bankTransOpt);

        container.append(h2Element)
            .append(selectElement);

        //$('#paymentOptions option').first().attr('selected', 'selected');
       // $('#paymentOptions option').first().attr('disabled' , 'disabled');
       // $('#paymentOptions option').first().attr('hidden', 'hidden');

        let extraDetailsElement = $('<div>').attr('id', 'extraDetails');

        container.append(extraDetailsElement);

        let asd = $('#paymentOptions').on('change', function() {
            $('#paymentOptions option')
                .filter(function () {
                    return $(this).val()
                });

            if(asd.val() === 'creditCard'){

                generatePaymentDetails();
            } else if (asd.val() === 'bankTransfer') {

                generateBankTransferInfo();
            }
        });
    }

    function checkOut() {

        let wrapper = $('#wrapper');

        wrapper.children().remove();

        let h4Element = $('<h4>').text('Thank you for your reservation!');

        wrapper.append(h4Element)
    }

    function generateBankTransferInfo() {

        let extraDetails = $('#extraDetails');

        extraDetails.children().remove();

        let pElement = $('<p>').html('You have 48 hours to transfer the amount to:<br>IBAN: GR96 0810 0010 0000 0123 4567 890');

        let checkOutBtn = $('<button>').attr('id', 'checkOut');
        checkOutBtn.text('Check Out');
        checkOutBtn.on('click', checkOut);

        extraDetails.append(pElement).append(checkOutBtn)
    }

    function generatePaymentDetails() {

        let extraDetails = $('#extraDetails');

        extraDetails.children().remove();

        let cardNumber = $('<div>').addClass('inputLabel');
        cardNumber.text('Card Number');
        cardNumber.append($('<input>'));

        let expirationDate = $('<div>').addClass('inputLabel');
        expirationDate.text('Expiration Date');
        expirationDate.append($('<input>'));

        let securityNumbers = $('<div>').addClass('inputLabel');
        securityNumbers.text('Security Numbers');
        securityNumbers.append($('<input>'));

        let checkOutBtn = $('<button>').attr('id', 'checkOut');
        checkOutBtn.text('Check Out');
        checkOutBtn.on('click', checkOut);

        extraDetails.append(cardNumber)
            .append($('<br>'))
            .append(expirationDate)
            .append($('<br>'))
            .append(securityNumbers)
            .append($('<br>'))
            .append(checkOutBtn);
    }

    function fillEditForm() {

        $('#infoPreview li')
            .each(function()  {

                let tokens = $(this).text().split(': ');

                switch (tokens[0]) {
                    case 'Name':
                        fullNameElement.val(tokens[1]);
                        break;
                    case 'E-mail':
                        emailElement.val(tokens[1]);
                        break;
                    case 'Phone':
                        phoneNumberElement.val(tokens[1]);
                        break;
                    case 'Address':
                        addressElement.val(tokens[1]);
                        break;
                    case 'Postal Code':
                        postalCodeElement.val(tokens[1]);
                        break;
                }
            });

        infoPreview.find('li').remove();

        submitBtn.prop('disabled', false);
        editBtn.prop('disabled', true);
        continueBtn.prop('disabled', true);
    }

    function readReservationInfo() {

        if(fullNameElement.val() && emailElement.val()){

            let nameLiElement = $('<li>').text(`Name: ${fullNameElement.val()}`);
            let emailLiElement = $('<li>').text(`E-mail: ${emailElement.val()}`);

            infoPreview.append(nameLiElement).append(emailLiElement);

            if(phoneNumberElement.val()){
                let phoneElement = $('<li>').text(`Phone: ${phoneNumberElement.val()}`);
                infoPreview.append(phoneElement);
            }

            if(addressElement.val()){
                let addresElement = $('<li>').text(`Address: ${addressElement.val()}`);
                infoPreview.append(addresElement);
            }

            if(postalCodeElement.val()){
                let postalElement = $('<li>').text(`Postal Code: ${postalCodeElement.val()}`);
                infoPreview.append(postalElement);
            }

            submitBtn.prop('disabled', true);
            editBtn.prop('disabled', false);
            continueBtn.prop('disabled', false);

            clearForm()
        }
    }

    function clearForm() {

        fullNameElement.val('');
        emailElement.val('');
        phoneNumberElement.val('');
        addressElement.val('');
        postalCodeElement.val('');
    }
}