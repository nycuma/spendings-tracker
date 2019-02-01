class Preferences {
    constructor() {
        this.currency = 'USD';
        this.locale = 'de-DE';
        this.spendingCategories = [
            { label: 'Food', value: 'food', descr: '', color: '#7E6258' },
            { label: 'Coffee Shops, Bars & Restaurants', value: 'coffeeshop', descr: '', color: '#3EAC9A' },
            { label: 'Household', value: 'household', descr: '', color: '#AC633E' },
            { label: 'Culture', value: 'culture', descr: '', color: '#58747E' },
            { label: 'Clothes', value: 'clothes', descr: '', color: '#3EAC63' },
            { label: 'Transport', value: 'transport', descr: '', color: '#7E7558' },
            { label: 'Gifts & Donations', value: 'gifts', descr: '', color: '#AC9A3E' }
        ]; 
    }

    get currency() {
        return this.currency;
    }

    set currency(newVal) {
        this.currency = newVal;
    }   
    
    get locale() {
        return this.locale;
    }

    set locale(newVal) {
        this.locale = newVal;
    }  

    get spendingCategories() {
        return this.spendingCategories;
    }

    set spendingCategories(newVal) {
        this.spendingCategories.push(newVal);
    }  
}

export let prefs = new Preferences();

export let Settings = {
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

export const Constants = {
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
    DATE_FORMAT_SHORT: 'DD.MM.YYYY',
    DATE_FORMAT_INPUT: 'YYYY-MM-DD',

    CURRENCIES: [
        { name: 'Euro', code: 'EUR', symbol: '€', locale: 'de-DE' },
        { name: 'US Dollar', code: 'USD', symbol: '$', locale: 'en-US' },
        { name: 'British Pound', code: 'GBP', symbol: '£', locale: 'en-UK' }
    ]
};
