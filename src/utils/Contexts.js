import React from 'react';
import { Constants } from './Constants';

const PreferenceContext = React.createContext({
    currency: Constants.DEFAULT_CURRENCY,
    locale: Constants.DEFAULT_LOCALE,
    updateCurrency: () => {},
    updateLocale: () => {}
});

const CategoriesContext = React.createContext(null);

export { PreferenceContext, CategoriesContext };