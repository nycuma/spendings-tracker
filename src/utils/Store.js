/**
 * Fetching data from local storage
 */

import store from 'store';
import uuidv4 from 'uuid/v4';

const LOCAL_STORAGE_KEY = 'spendingsPositions';

/**
 * Return spendings positons, optionally filtered by years/month/day
 * @param {Number} year 
 * @param {Number} month month of the year (value 0 to 11), requires value for year
 * @param {Number} day day of the month (values 1 to 31), requires value for year and month
 * @param {Number} week week of the year (values 1 to 52), requires value for year
 */
const getSpendingsPositions = (year, month, day, week) => {
    const data = store.get(LOCAL_STORAGE_KEY);
    if(!data) { 
        return []; 
    }
    // TODO apply filter 
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
const getSpendingsPositionsBetween = (dateStart, dateEnd, count) => {
    if(!dateStart && !dateEnd) { 
        return []; 
    }
    let data = store.get(LOCAL_STORAGE_KEY);
    if(!data) { 
        return []; 
    }

    if(dateStart) {
        data = data.filter(item => item.day > dateStart);
    }

    if(dateEnd) {
        data = data.filter(item => item.day < dateEnd);
    }

    return count ? data.slice(0, count) : data;
};

/**
 * Returns most recently added spending positions, descending order.
 * 
 * @param {Number} count Number of positions to return
 */
const getSpendingsPositionsRecentlyAdded = (count) => {
    const data = store.get(LOCAL_STORAGE_KEY);
    if(!data) { 
        return []; 
    }
    // return elements from the end of the array
    return data.slice(-count).reverse();
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
        dateAdded: new Date()
    });
    store.set(LOCAL_STORAGE_KEY, data);
};


export { getSpendingsPositions, getSpendingsPositionsBetween, 
    getSpendingsPositionsRecentlyAdded, postSpendingPosition };




