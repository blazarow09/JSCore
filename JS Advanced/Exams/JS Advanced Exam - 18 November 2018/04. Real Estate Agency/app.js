function realEstateAgency () {

    $('#findOffer button').on('click', searchForOffer);

    function searchForOffer() {

        let [familyBudged, familyAppType, familyName] = $('#findOffer input');

        if(validateFindOfferFields(familyBudged.value, familyAppType.value, familyName.value)){

            let countOfApartments = $('#building').find('.apartment').length;

            for (let i = 0; i < countOfApartments; i++){

               let [rentEl, typeEl, commissionEl] = $('#building').find('.apartment')[i].children;

                let rentPrice = +rentEl.innerText.split(' ')[1];
                let type = typeEl.innerText.replace('Type: ', '');
                let commissionPercent = +commissionEl.innerText.split(' ')[1];

                let commission = (commissionPercent / 100) * rentPrice;

                let moneyNeed = commission + rentPrice;

                if(familyAppType.value.localeCompare(type) === 0 &&
                    +familyBudged.value >= moneyNeed) {

                   let currentApartment = $('#building').find('.apartment')[i];

                    currentApartment.style.border = "2px solid red";

                    currentApartment.children[0].innerText = familyName.value;
                    currentApartment.children[1].innerText = 'live here now';
                    currentApartment.children[2].remove();
                    let buttonMoveOut = document.createElement('button');
                    buttonMoveOut.innerText = 'MoveOut';
                    buttonMoveOut.addEventListener('click', () => {
                        currentApartment.remove();
                        $('#message').text(`They had found cockroaches in ${familyName.value}'s apartment`)

                    });

                    currentApartment.append(buttonMoveOut);

                    let currentProfit = $('#roof h1').text().split('Agency profit: ')[1].split(' ')[0];

                    let newProfit = +currentProfit + commission * 2;

                    $('#roof h1').text(`Agency profit: ${newProfit} lv.`);

                    $('#message').text('Enjoy your new home! :)');

                    return;
                } else {

                    $('#message').text('We were unable to find you a home, so sorry :(')
                }
            }

        }

        familyBudged.value = '';
        familyAppType.value = '';
        familyName.value = '';
    }

    $('#regOffer button').on('click', registerOffer);

    function registerOffer() {

        let [rentPrice, apartmentType, commissionRate] = $('#regOffer input');
        let registrationMessage = '';
        let building = $('#building');

        if(validateRegOfferFields(rentPrice.value, apartmentType.value, commissionRate.value)) {

            registrationMessage = 'Your offer was created successfully.';
            $('#message').text(registrationMessage);

            let divElement = $('<div>');
            divElement.attr('class', 'apartment');

            let pRentElement = $('<p>');
            pRentElement.text(`Rent: ${rentPrice.value}`)

            let pTypeElement = $('<p>');
            pTypeElement.text(`Type: ${apartmentType.value}`);

            let pCommissionElement = $('<p>');
            pCommissionElement.text(`Commission: ${commissionRate.value}`);

            divElement.append(pRentElement).append(pTypeElement).append(pCommissionElement);

            building.append(divElement);
        } else {

            registrationMessage = 'Your offer registration went wrong, try again.';
            $('#message').text(registrationMessage);
        }

        rentPrice.value = '';
        apartmentType.value = '';
        commissionRate.value = '';
    }

    function validateFindOfferFields(familyBudged, familyAppType, familyName) {

        if(+familyBudged <= 0 ||
            isNaN(+familyBudged) ||
            familyAppType === '' ||
            familyName === ''){

            return false;
        } else {

            return true;
        }

    }

    function validateRegOfferFields(rentPrice, apartmentType, commissionRate) {

        if(isNaN(+rentPrice) ||
            +rentPrice <= 0 ||
            isNaN(+commissionRate) ||
            +commissionRate < 0 ||
            +commissionRate > 100 ||
            apartmentType === '' ||
            apartmentType.includes(':')){

            return false;
        } else {

            return true
        }
    }
}