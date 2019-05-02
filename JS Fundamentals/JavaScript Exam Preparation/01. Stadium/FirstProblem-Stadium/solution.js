function solve() {

    function checkSector(sectorNum, zone) {

        if (sectorNum === 0) {

            sectorName = 'A';

            if (zone === 'Levski' || zone === 'Litex') {

                price = 10;
            } else {

                price = 25;
            }

        } else if (sectorNum === 1) {

            sectorName = 'B';

            if (zone === 'Levski' || zone === 'Litex') {

                price = 7;
            } else {

                price = 15;
            }

        } else if (sectorNum === 2) {

            sectorName = 'C';
            if (zone === 'Levski' || zone === 'Litex') {

                price = 5;
            } else {

                price = 10;
            }
        }
    }

    function takeSeat(e) {

        let seat = e.target;

        let zone = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.children[0].innerHTML;

        let sector = e.target.parentNode.cellIndex;

        if (seat.value !== 'taken') {

            if (zone === 'VIP') {

                checkSector(sector, zone);

                seat.style.backgroundColor = 'rgb(255,0,0)';
                seat.value = 'taken';
                totalSold += price;
                fansCount++;
                message = ` Seat ${seat.innerHTML} in zone ${zone} sector ${sectorName} was taken.\n`;

                output.value += message;
            } else if (zone === 'Levski') {

                checkSector(sector, zone);

                seat.style.backgroundColor = 'rgb(255,0,0)';
                seat.value = 'taken';
                totalSold += price;
                fansCount++;
                message = ` Seat ${seat.innerHTML} in zone ${zone} sector ${sectorName} was taken.\n`;

                output.value += message;
            } else if (zone === 'Litex') {

                checkSector(sector, zone);

                seat.style.backgroundColor = 'rgb(255,0,0)';
                seat.value = 'taken';
                totalSold += price;
                fansCount++;
                message = ` Seat ${seat.innerHTML} in zone ${zone} sector ${sectorName} was taken.\n`;

                output.value += message;
            }
        } else {

            checkSector(sector, zone);

            message = ` Seat ${seat.innerHTML} in zone ${zone} sector ${sectorName} is unavailable.\n`;

            output.value += message;
        }

    }

    function summary() {

        spanSummaryElement.innerHTML = `${totalSold} leva, ${fansCount} fans.`
    }

    let sectorName = '';
    let message = '';
    let price = 0;
    let totalSold = 0;
    let fansCount = 0;
    let buttons = document.querySelectorAll('.seat');
    let output = document.getElementById('output');
    let summaryButton = document.getElementById('summary');
    let spanSummaryElement = document.querySelector('span');
    Array.from(buttons).forEach(btn => {
        btn.addEventListener('click', takeSeat);
    });

    summaryButton.addEventListener('click', summary);
}