/**
 * Fetching data from local storage
 */

import store from 'store';
import Utils from './Utils';
import { isSameWeek, isSameMonth } from 'date-fns';
import { Settings } from './Constants';

const LOCAL_STORAGE_KEY = 'spendings';

 /**
  * Returns spending positons that were spent on the same day / in the same year, month,
  * or week as the reference date.
  * If no parameter is given, all spendings will be returned.
  * If only date is given, all spendings from the same day will be returned.
  * 
  * @param {Date} date reference date
  * @param {Boolean} onlySameWeek 
  * @param {Boolean} onlySameMonth 
  * @param {Boolean} onlySameYear 
  */
function getSpendings(date, onlySameWeek, onlySameMonth, onlySameYear) {
    let data = store.get(LOCAL_STORAGE_KEY);
    if(!data) { 
        return []; 
    }

    if(arguments.length === 0) {
        return data;
    }

    if(arguments.length === 1) {
        return data.filter(item => Utils.isSameDay(new Date(item.day), date));
    }

    if(onlySameWeek === true) {
        return data.filter(item => isSameWeek(new Date(item.day), date, {weekStartsOn: 1}));
    }

    if(onlySameMonth === true) {
        return data.filter(item => isSameMonth(new Date(item.day), date));
    }

    if(onlySameYear === true) {
        return data.filter(item => new Date(item.day).getFullYear() === date.getFullYear());
    }

    return data;
}

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
        let amountByCat = data.filter(item => item.cat === cat.value)
                              .map(item => item.amount)
                              .reduce((prev, next) => prev + next, 0);
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
        id: pos.id,
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