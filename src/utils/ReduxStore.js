import { combineReducers } from 'redux';
import uuidv4 from 'uuid/v4';
import { getSpendings } from './LocalStore';

const GET_SPENDINGS_FROM_DB = 'GET_SPENDINGS_FROM_DB';
const ADD_SPENDING = 'ADD_SPENDING';

// action creators
export const getSpendingsFromDB = () => {
    return {
        type: GET_SPENDINGS_FROM_DB
    };
};

export const addSpending = (spending) => {
    return {
        type: ADD_SPENDING,
        ...spending
    };
};

// reducers
const spendings = (state = [], action) => {
    switch(action.type) {
        case GET_SPENDINGS_FROM_DB : {
            return getSpendings();
        }
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
        default :
            return state;
    }
};

export const reducer = combineReducers({
    spendings
});