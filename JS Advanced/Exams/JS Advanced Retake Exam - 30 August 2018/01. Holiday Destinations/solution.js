function addDestination() {
    let cityElement = $('#input input').first();
    let countryElement = $('#input input').last();
    let seasonElement = $('#seasons');
    let destinationsList = $('#destinationsList');

    if(cityElement.val() && countryElement.val()){

        let trEl = $('<tr>');
        let cityCountryEl = $('<td>').text(`${cityElement.val()}, ${countryElement.val()}`);

        let season = seasonElement.val()
            .substr(0,1)
            .toUpperCase() + seasonElement.val()
            .substr(1);

        let seasonEl = $('<td>').text(`${season}`);

        trEl.append(cityCountryEl).append(seasonEl);

        destinationsList.append(trEl);

        incrementBySeason(seasonElement.val());
        clearInput(cityElement,countryElement);
    }

    function incrementBySeason(season) {
        switch (season) {
            case 'summer':
                $('#summer').val(Number($('#summer').val()) + 1);
                break;
            case 'autumn':
                $('#autumn').val(Number($('#autumn').val()) + 1);
                break;
            case 'winter':
                $('#winter').val(Number($('#winter').val()) + 1);
                break;
            case 'spring':
                $('#spring').val(Number($('#spring').val()) + 1);
                break;
        }
    }
    function clearInput(city, country) {
        city.val('');
        country.val('');
    }
}