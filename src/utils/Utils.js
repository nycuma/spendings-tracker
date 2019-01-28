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
    },

    /**
     * Filters array of spending positions by their category.
     * @param {Array} spendings objects with spending positions
     * @param {String} category 
     */
    filterSpendingsByCategory(spendings, category) {
        if(!spendings || spendings.length === 0) {
            return [];
        }
        return spendings.filter(item => item.cat === category); 
    },

    calculateTotalAmountByCategory(spendings, category) {
        if(!spendings || spendings.length === 0) {
            return 0;
        }

        return spendings.filter(item => item.cat === category)
                        .map(item => item.amount)
                        .reduce((prevAmount, nextAmount) => prevAmount + nextAmount, 0);  
    },

    calculateSumOfSpendings(spendings) {
        if(!spendings || spendings.length === 0) {
            return 0;
        }
        return spendings.map(item => item.amount).reduce((prev, next) => prev + next, 0);
    },

    isSameDay(date1, date2) {
        return date1.getFullYear() === date2.getFullYear() 
                && date1.getMonth() === date2.getMonth()
                && date1.getDate() === date2.getDate();
    }
};

export default Utils;