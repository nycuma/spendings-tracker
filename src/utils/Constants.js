export const Constants = {
    LOCALE_DECIMAL_OPTIONS: { 
        style: 'decimal', 
        minimumFractionDigits: 2, 
        maximumFractionDigits: 2 
    },
    DATE_FORMAT: 'DD MMM YYYY',
    DATE_FORMAT_SHORT: 'DD.MM.YYYY',
    DATE_FORMAT_INPUT: 'YYYY-MM-DD',
    FIRST_DAY_WEEK: 1, // 0: Sunday, 1: Monday
    TIME_UNITS: ['day', 'week', 'month', 'year'],
    
    CURRENCIES: [
        { name: 'Euro', code: 'EUR', symbol: '€' },
        { name: 'US Dollar', code: 'USD', symbol: '$' },
        { name: 'British Pound', code: 'GBP', symbol: '£' }
    ],
    LOCALES: ['de-DE', 'en-US', 'en-UK'],

    DEFAULT_CURRENCY_OPTIONS: {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    },
    DEFAULT_LOCALE: 'de-DE',
    DEFAULT_CURRENCY: 'EUR',
    DEFAULT_CATEGORIES: [{ label: 'Food', value: 'food', descr: '', color: '#7E6258' },
        { label: 'Coffee Shops, Bars & Restaurants', value: 'coffeeshop', descr: '', color: '#3EAC9A' },
        { label: 'Household', value: 'household', descr: '', color: '#AC633E' },
        { label: 'Culture', value: 'culture', descr: '', color: '#58747E' },
        { label: 'Clothes', value: 'clothes', descr: '', color: '#3EAC63' },
        { label: 'Transport', value: 'transport', descr: '', color: '#7E7558' },
        { label: 'Gifts & Donations', value: 'gifts', descr: '', color: '#AC9A3E' }]
};
