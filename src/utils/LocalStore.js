/**
 * Fetching data from local storage
 */
import uuidv4 from 'uuid/v4';
import store from 'store';
import { isSameDay, isSameWeek, isSameMonth } from 'date-fns';
import { Constants } from './Constants';

const KEY_SPENDINGS = 'spendings';
const KEY_CATEGORIES = 'categories';
const KEY_CURRENCY = 'currency';
const KEY_LOCALE = 'locale';
const KEY_RECURRENT_SPENDINGS = 'recurrentSpending';

 /**
  * Returns spending positons from local storage that were spent 
  * on the same day / in the same year, month, or week as the reference date.
  * If no parameter is given, all spendings will be returned.
  * If only date is given, all spendings from the same day will be returned.
  * 
  * @param {Date} date reference date
  * @param {Boolean} onlySameWeek 
  * @param {Boolean} onlySameMonth 
  * @param {Boolean} onlySameYear 
  */
 export function getSpendings(date, onlySameWeek, onlySameMonth, onlySameYear) {
    let data = store.get(KEY_SPENDINGS);
    if(!data) { 
        return []; 
    }

    if(arguments.length === 0) {
        return data;
    }

    if(arguments.length === 1) {
        return data.filter(item => isSameDay(new Date(item.day), date));
    }

    if(onlySameWeek === true) {
        return data.filter(item => isSameWeek(new Date(item.day), date, { weekStartsOn: Constants.FIRST_DAY_WEEK }));
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
 * @param {String} category (optional)
 * @param {Number} count number of positions that should be returned (optional)
 */
export const getSpendingsBetween = (dateStart, dateEnd, category, count) => {
    if(!dateStart && !dateEnd) { 
        return []; 
    }
    let data = store.get(KEY_SPENDINGS);
    if(!data) { 
        return []; 
    }

    if(dateStart) {
        data = data.filter(item => new Date(item.day) >= dateStart);
    }

    if(dateEnd) {
        data = data.filter(item => new Date(item.day) <= dateEnd);
    }

    if(category) {
        data = data.filter(item => item.cat === category);
    }

    return count ? data.slice(0, count) : data;
};

/**
 * Returns most recently added spending positions, descending order.
 * 
 * @param {Number} count Number of positions to return
 */
export const getSpendingsRecentlyAdded = (count) => {
    const data = store.get(KEY_SPENDINGS);
    if(!data) { 
        return []; 
    }
    // return elements from the end of the array
    return data.slice(-count).reverse();
};

export const postSpendingPosition = (pos) => {
    let data = store.get(KEY_SPENDINGS);
    if(!data) { 
        data = []; 
    }
    data.push({
        id: pos.id ? pos.id : uuidv4(),
        day: pos.day,
        cat: pos.cat,
        amount: pos.amount,
        comment: pos.comment,
        dateAdded: pos.dateAdded ? pos.dateAdded : new Date()
    });
    
    store.set(KEY_SPENDINGS, data);
};

export const saveSpendings = (spendingsArray) => {
    let data = store.get(KEY_SPENDINGS);
    if(!data) { 
        data = []; 
    }
    store.set(KEY_SPENDINGS, [...data, ...spendingsArray]);
};

export const loadCurrency = () => {
    return store.get(KEY_CURRENCY);
};

export const saveCurrency = (currency) => {
    store.set(KEY_CURRENCY, currency);
};

export const loadLocale = () => {
    return store.get(KEY_LOCALE);
};

export const saveLocale = (locale) => {
    store.set(KEY_LOCALE, locale);
};

export const loadCategories = () => {
    return store.get(KEY_CATEGORIES);
};

export const saveCategories = (cats) => {
    store.set(KEY_CATEGORIES, cats);
};

export const getRecurrentSpendings = () => {
    const recSpendings = store.get(KEY_RECURRENT_SPENDINGS);
    if(!recSpendings) { 
        return []; 
    }
};

export const postRecurrentSpending = (recurrentSpending) => {
    let recSpendings = store.get(KEY_RECURRENT_SPENDINGS);
    if(!recSpendings) { 
        recSpendings = []; 
    }
    recSpendings.push({
        startDate: recurrentSpending.startDate ? recurrentSpending.startDate : new Date(),
        interval: recurrentSpending.interval,
        amount: recurrentSpending.amount,
        cat: recurrentSpending.cat,
        comment: recurrentSpending.comment
    });
    
    store.set(KEY_RECURRENT_SPENDINGS, recurrentSpending);
};