class Hotel {
    constructor(name, capacity){
        this.name = name;
        this.capacity = capacity;
        this.bookings = [];
        this.currentBookingNumber = 1;
    }

    get roomsPricing()
    {
        return this.roomPricing();
    }

    get servicesPricing(){

        return this.servicePricing();
    }

    roomPricing() {
        return {
            single:50,
            double: 90,
            maisonette: 135
        };
    }

    servicePricing() {
        return {
            food: 10,
            drink: 15,
            housekeeping: 25
        }
    }

    rentARoom(clientName, roomType, nights){


    }
}

let hotel = new Hotel('HotUni', 10);
