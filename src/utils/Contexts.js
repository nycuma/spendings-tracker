import React from 'react';
import { Constants } from './Constants';

const PreferenceContext = React.createContext({
    currency: Constants.DEFAULT_CURRENCY,
    locale: Constants.DEFAULT_LOCALE,
    updateCurrency: () => {},
    updateLocale: () => {}
});

const CategoriesContext = React.createContext({
    categories: Constants.DEFAULT_CATEGORIES,
    addCategory: () => {},
    removeCategory: () => {}
});

export { PreferenceContext, CategoriesContext };