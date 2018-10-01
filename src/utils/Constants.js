// make constants private?


let Settings = {
    CURRENCY: 'EUR',
    LOCALE_CURRENCY: 'de-DE',
    FIRST_DAY_WEEK: 1, //0: Sunday, 1: Monday
    SPENDING_CATEGORIES: [
        { label: 'Food', value: 'food', descr: '' },
        { label: 'Coffee Shops, Bars & Restaurants', value: 'coffeeshop', descr: '' },
        { label: 'Household', value: 'household', descr: '' },
        { label: 'Culture', value: 'culture', descr: '' },
        { label: 'Clothes', value: 'clothes', descr: '' },
        { label: 'Transport', value: 'transport', descr: '' },
        { label: 'Gifts & Donations', value: 'gifts', descr: '' }
    ]   
};



const Constants = {
    LOCALE_CURRENCY_OPTIONS: { 
        style: 'currency', 
        currency: Settings.CURRENCY, 
        minimumFractionDigits: 2, 
        maximumFractionDigits: 2 
    },
    LOCALE_DECIMAL_OPTIONS: { 
        style: 'decimal', 
        minimumFractionDigits: 2, 
        maximumFractionDigits: 2 
    },
    DATE_FORMAT: 'DD MMM YYYY',
    
};

export { Constants, Settings };
