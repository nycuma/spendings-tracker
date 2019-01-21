import isLeapYear from 'date-fns/is_leap_year';
import { Settings } from './Constants';

let utils = {

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
     * Calculates the dates of the days that are in the
     * same week as currentDay, depending on the propeties
     * value of the first week day (Monday or Sunday).
     * @param currentDay 
     * @returns array with 6 Date objects (excluding current day)
     */
    getDaysOfThisWeek(currentDay) {

        let numPastDays = -1, numFutureDays = -1;
        let diff = currentDay.getDay()- Settings.FIRST_DAY_WEEK;
        let weekdays = [];

        if(diff >= 0) {
            numPastDays = diff;
            numFutureDays = 6 - diff;
        } else if( diff === -1) {
            numPastDays = 6;
            numFutureDays = 0;
        }

        while(numPastDays > 0) {
            let weekday = new Date();
            weekday.setDate(currentDay.getDate() - numPastDays);
            numPastDays--;
            weekdays.push(weekday);
        }

        while(numFutureDays > 0) {
            let weekday = new Date();
            weekday.setDate(currentDay.getDate() + numFutureDays);
            numFutureDays--;
            weekdays.push(weekday);
        }

        return weekdays;
    },

    /**
     * Filters array of spending positions by their category.
     * @param {Array} spendings 
     * @param {String} category 
     */
    filterSpendingsByCategory(spendings, category) {
        if(!spendings || spendings.length === 0) {
            return [];
        }
        return spendings.filter((item) => {
            return item.cat === category;
        }); 
    }
};

export default utils;