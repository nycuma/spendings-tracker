/**
 * Fetching data from local storage
 */

import store from 'store';
import uuidv4 from 'uuid/v4';
import { DateUtils } from 'react-day-picker';
import { Settings } from './Constants';

const LOCAL_STORAGE_KEY = 'spendings';

/**
 * Return spendings positons, optionally filtered by specific date or year/month/week.
 * If date is given, other parameters will be ignored.
 * 
 * @param {Date} date specific date
 * @param {Number} year 
 * @param {Number} month month of the year (value 0 to 11), requires value for year
 * @param {Number} week week of the year (values 1 to 52), requires value for year
 */
const getSpendings = (date, year, month, week) => {
    let data = store.get(LOCAL_STORAGE_KEY);
    console.log('getSpendings data: ' + JSON.stringify(data));
    if(!data) { 
        return []; 
    }

    if(date) {
        return data.filter(item => DateUtils.isSameDay(new Date(item.day), date));
    }

    if(year) {
        data = data.filter(item => new Date(item.day).getFullYear() === year);

        if(month) {
            data = data.filter(item => new Date(item.day).getMonth() === month);
        }
        if(week) {
            // TODO filter by week
        }
    }
    return data;
};

/**
 * Returns spendings postions after and/or before a certain date.
 * If neither start date nor end date is specified, an empty array is returned.
 * 
 * @param {Date} dateStart (optional)
 * @param {Date} dateEnd (optinal)
 * @param {Number} count number of positions that should be returned (optional)
 */
const getSpendingsBetween = (dateStart, dateEnd, count) => {
    if(!dateStart && !dateEnd) { 
        return []; 
    }
    let data = store.get(LOCAL_STORAGE_KEY);
    if(!data) { 
        return []; 
    }

    if(dateStart) {
        data = data.filter(item => new Date(item.day) > dateStart);
    }

    if(dateEnd) {
        data = data.filter(item => new Date(item.day) < dateEnd);
    }

    return count ? data.slice(0, count) : data;
};

/**
 * Returns most recently added spending positions, descending order.
 * 
 * @param {Number} count Number of positions to return
 */
const getSpendingsRecentlyAdded = (count) => {
    const data = store.get(LOCAL_STORAGE_KEY);
    if(!data) { 
        return []; 
    }
    // return elements from the end of the array
    return data.slice(-count).reverse();
};

/**
 * Returns array with total amount spent on each categorie all time.
 */
const getAmountSpentByCategory = () => {
    const data = store.get(LOCAL_STORAGE_KEY);
    if(!data) { 
        return []; 
    }

    return Settings.SPENDING_CATEGORIES.map(cat => {
        let amountByCat = data.filter(item => item.cat == cat.value)
                              .reduce((prev, next) => prev.amount + next.amount, 0);
        return {
            cat: cat.value,
            amount: amountByCat
        };
    });
};


const postSpendingPosition = (pos) => {
    let data = store.get(LOCAL_STORAGE_KEY);
    if(!data) { 
        data = []; 
    }
    data.push({
        id: uuidv4(),
        day: pos.day,
        cat: pos.cat,
        amount: pos.amount,
        comment: pos.comment,
        dateAdded: pos.dateAdded ? pos.dateAdded : new Date()
    });
    store.set(LOCAL_STORAGE_KEY, data);
};


export { getSpendings, getSpendingsBetween, getSpendingsRecentlyAdded, 
    getAmountSpentByCategory, postSpendingPosition };