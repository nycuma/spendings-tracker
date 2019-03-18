import { combineReducers } from 'redux';
import uuidv4 from 'uuid/v4';

const ADD_SPENDING = 'ADD_SPENDING';
const ADD_SPENDINGS = 'ADD_SPENDINGS';
const UPDATE_CURRENCY = 'UPDATE_CURRENCY';
const UPDATE_LOCALE = 'UPDATE_LOCALE';

// action creators
export const addSpending = (spending) => {
    return {
        type: ADD_SPENDING,
        ...spending
    };
};

export const addSpendings = (spendings) => {
    return {
        type: ADD_SPENDINGS,
        spendings
    };
};

export const updateCurrency = (currency) => {
    return {
        type: UPDATE_CURRENCY,
        currency
    };
};

export const updateLocale = (locale) => {
    return {
        type: UPDATE_LOCALE,
        locale
    };
};

// reducers
const spendingsReducer = (state = [], action) => {
    switch(action.type) {
        case ADD_SPENDING : {
            return [
                ...state,
                {
                    id: action.id ? action.id : uuidv4(),
                    day: action.day,
                    cat: action.cat,
                    amount: action.amount,
                    comment: action.comment,
                    dateAdded: action.dateAdded ? action.dateAdded : new Date()
                }
            ];
        }
        case ADD_SPENDINGS : {
            return [
                ...state,
                ...action.spendings
            ];
        }
        default :
            return state;
    }
};

const settingsReducer = (state = [], action) => {
    switch(action.type) {
        case UPDATE_CURRENCY : {
            return { 
                ...state,
                currency: action.currency
            };

        }
        case UPDATE_LOCALE : {
            return {
                ...state,
                locale: action.locale
            };
        }
        default :
            return state;
    }

};

export let rootReducer = combineReducers({
    spendings: spendingsReducer,
    settings: settingsReducer
});