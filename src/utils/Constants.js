let Settings = {
    CURRENCY: 'EUR',
    LOCALE_CURRENCY: 'de-DE',
    FIRST_DAY_WEEK: 1, //0: Sunday, 1: Monday
    SPENDING_CATEGORIES: [
        { label: 'Food', value: 'food', descr: '', color: '#7E6258' },
        { label: 'Coffee Shops, Bars & Restaurants', value: 'coffeeshop', descr: '', color: '#3EAC9A' },
        { label: 'Household', value: 'household', descr: '', color: '#AC633E' },
        { label: 'Culture', value: 'culture', descr: '', color: '#58747E' },
        { label: 'Clothes', value: 'clothes', descr: '', color: '#3EAC63' },
        { label: 'Transport', value: 'transport', descr: '', color: '#7E7558' },
        { label: 'Gifts & Donations', value: 'gifts', descr: '', color: '#AC9A3E' }
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
    DATE_FORMAT_INPUT: 'YYYY-MM-DD'
};

export { Constants, Settings };
