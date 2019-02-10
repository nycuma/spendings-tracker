import React from 'react';
import { Constants } from './Constants';

export const PreferenceContext = React.createContext({
    currency: Constants.DEFAULT_CURRENCY,
    locale: Constants.DEFAULT_LOCALE,
    categories: Constants.DEFAULT_CATEGORIES,
    updateCurrency: () => {},
    updateLocale: () => {},
    addCategory: () => {},
    removeCategory: () => {}
});