import isLeapYear from 'date-fns/is_leap_year';

let Utils = {

    getNumDaysOfMonth(date) {
        let numDays;
        switch(date.getMonth()) {
            case 0: case 2: case 4: case 6: case 7: case 9: case 11:
                numDays = 31;
                break;
            case 3: case 5: case 8: case 10:
                numDays = 30;
                break;
            case 1: 
                numDays = isLeapYear(date) ? 29 : 28;
                break;
            default:
                numDays = 31;
        }
        return numDays;
    }
};

export default Utils;