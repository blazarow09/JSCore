function solve(inputArr, crit) {

    class Ticket {

        constructor(destination, price, status) {

            this.destination = destination;
            this.price = price;
            this.status = status;
        }
    }

    let uTickets = [];

    for (let line of inputArr) {

        let [destination, price, status] = line.split('|');

        let ticket = new Ticket(destination, Number(price), status);

        uTickets.push(ticket);
    }

    let sTickets = [];

    switch (crit){

        case 'destination':

            sTickets = uTickets.sort((a, b) => a.destination.localeCompare(b.destination));
            break;
        case 'price':

            sTickets = uTickets.sort((a, b) => a.price - b.price);
            break;
        case 'status':

            sTickets = uTickets.sort((a, b) => a.status.localeCompare(b.status));
            break;
    }

    return sTickets
}

solve(['Philadelphia|94.20|available',
        'New York City|95.99|available',
        'New York City|95.99|sold',
        'Boston|126.20|departed'],
    'destination'
);