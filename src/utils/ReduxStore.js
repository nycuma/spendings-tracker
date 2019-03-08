// action creators
export const initStore = () => {
    return {
        type: 'INIT_STORE'
    };
};

export const addSpending = (spending) => {
    return {
        type: 'ADD_SPENDING',
        ...spending
    };
};

export const updateSelectedDay = (day) => {
    return {
        type: 'UPDATE_DAY',
        day: day
    };
};