import { combineReducers } from 'redux';
import uuidv4 from 'uuid/v4';

const ADD_SPENDING = 'ADD_SPENDING';
const ADD_SPENDINGS = 'ADD_SPENDINGS';

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

export let rootReducer = combineReducers({
    spendings: spendingsReducer
});