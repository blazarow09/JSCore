function f(dayOfWeek, service, time) {
    let price = 0;

    if (service === "Fitness") {
        if (time >= 8.00 && time <= 15.00) {
            switch (dayOfWeek) {
                case "Monday":
                    price = 5.00;
                    break;
                case "Tuesday":
                    price = 5.00;
                    break;
                case "Wednesday":
                    price = 5.00;
                    break;
                case "Thursday":
                    price = 5.00;
                    break;
                case "Friday":
                    price = 5.00;
                    break;
                case "Saturday":
                    price = 8.00;
                    break;
                case "Sunday":
                    price = 8.00;
                    break;
            }
        }
        else if (time > 15.00 && time <= 22.00) {
            switch (dayOfWeek) {
                case "Monday":
                    price = 7.50;
                    break;
                case "Tuesday":
                    price = 7.50;
                    break;
                case "Wednesday":
                    price = 7.50;
                    break;
                case "Thursday":
                    price = 7.50;
                    break;
                case "Friday":
                    price = 7.50;
                    break;
                case "Saturday":
                    price = 8.00;
                    break;
                case "Sunday":
                    price = 8.00;
                    break;
            }
        }
        }
    else if (service === "Sauna") {
        if (time >= 8.00 && time <= 15.00) {
            switch (dayOfWeek) {
                case "Monday":
                    price = 4.00;
                    break;
                case "Tuesday":
                    price = 4.00;
                    break;
                case "Wednesday":
                    price = 4.00;
                    break;
                case "Thursday":
                    price = 4.00;
                    break;
                case "Friday":
                    price = 4.00;
                    break;
                case "Saturday":
                    price = 7.00;
                    break;
                case "Sunday":
                    price = 7.00;
                    break;
            }
        }
        else if (time > 15.00 && time <= 22.00) {
            switch (dayOfWeek) {
                case "Monday":
                    price = 6.50;
                    break;
                case "Tuesday":
                    price = 6.50;
                    break;
                case "Wednesday":
                    price = 6.50;
                    break;
                case "Thursday":
                    price = 6.50;
                    break;
                case "Friday":
                    price = 6.50;
                    break;
                case "Saturday":
                    price = 7.00;
                    break;
                case "Sunday":
                    price = 7.00;
                    break;
            }
        }
    }
    else if (service === "Instructor") {
        if (time >= 8.00 && time <= 15.00) {
            switch (dayOfWeek) {
                case "Monday":
                    price = 10.00;
                    break;
                case "Tuesday":
                    price = 10.00;
                    break;
                case "Wednesday":
                    price = 10.00;
                    break;
                case "Thursday":
                    price = 10.00;
                    break;
                case "Friday":
                    price = 10.00;
                    break;
                case "Saturday":
                    price = 15.00;
                    break;
                case "Sunday":
                    price = 15.00;
                    break;
            }
        }
        else if (time > 15.00 && time <= 22.00) {
            switch (dayOfWeek) {
                case "Monday":
                    price = 12.50;
                    break;
                case "Tuesday":
                    price = 12.50;
                    break;
                case "Wednesday":
                    price = 12.50;
                    break;
                case "Thursday":
                    price = 12.50;
                    break;
                case "Friday":
                    price = 12.50;
                    break;
                case "Saturday":
                    price = 15.00;
                    break;
                case "Sunday":
                    price = 15.00;
                    break;
            }
        }
    }

    return price;
}
console.log(f('Monday', 'Sauna', 15.30));