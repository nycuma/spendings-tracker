class Preferences {
    constructor() {
        this._currency = 'EUR';
        this._locale = 'de-DE';
        this._currencyOptions = { 
            style: 'currency', 
            currency: this._currency, 
            minimumFractionDigits: 2, 
            maximumFractionDigits: 2 
        };
        this._spendingCategories = [
            { label: 'Food', value: 'food', descr: '', color: '#7E6258' },
            { label: 'Coffee Shops, Bars & Restaurants', value: 'coffeeshop', descr: '', color: '#3EAC9A' },
            { label: 'Household', value: 'household', descr: '', color: '#AC633E' },
            { label: 'Culture', value: 'culture', descr: '', color: '#58747E' },
            { label: 'Clothes', value: 'clothes', descr: '', color: '#3EAC63' },
            { label: 'Transport', value: 'transport', descr: '', color: '#7E7558' },
            { label: 'Gifts & Donations', value: 'gifts', descr: '', color: '#AC9A3E' }
        ];
        this._firstDayWeek = 1; // 0: Sunday, 1: Monday
    }

    get currency() {
        return this._currency;
    }

    set currency(newVal) {
        this._currency = newVal;
    }   
    
    get locale() {
        return this._locale;
    }

    get currencyOptions() {
        return this._currencyOptions;
    }

    set locale(newVal) {
        this._locale = newVal;
    }  

    get spendingCats() {
        return this._spendingCategories;
    }

    set addCategory(newVal) {
        this._spendingCategories.push(newVal);
    }  

    get firstDayWeek() {
        return this._firstDayWeek;
    }

    set firstDayWeek(newVal) {
        this._firstDayWeek = newVal;
    }
}

export let prefs = new Preferences();

export const Constants = {
    LOCALE_DECIMAL_OPTIONS: { 
        style: 'decimal', 
        minimumFractionDigits: 2, 
        maximumFractionDigits: 2 
    },
    DATE_FORMAT: 'DD MMM YYYY',
    DATE_FORMAT_SHORT: 'DD.MM.YYYY',
    DATE_FORMAT_INPUT: 'YYYY-MM-DD',

    CURRENCIES: [
        { name: 'Euro', code: 'EUR', symbol: '€' },
        { name: 'US Dollar', code: 'USD', symbol: '$' },
        { name: 'British Pound', code: 'GBP', symbol: '£' }
    ],
    LOCALES: ['de-DE', 'en-US', 'en-UK']
};
