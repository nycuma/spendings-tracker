import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import { HashRouter } from 'react-router-dom';
import { rootReducer } from './utils/ReduxStore';
import Main from './Main';
import registerServiceWorker from './registerServiceWorker';
import { getSpendings, loadCurrency, loadLocale, loadCategories } from './utils/LocalStore';
import { Constants } from './utils/Constants';
import './style.scss';

const DEBUG = true;

const defaults = {
    spendings: getSpendings() || [],
    settings: {
        currency: loadCurrency() || Constants.DEFAULT_CURRENCY,
        locale: loadLocale() || Constants.DEFAULT_LOCALE,
        categories: loadCategories() || Constants.DEFAULT_CATEGORIES
    }
};

//  pre-load all spendings and settings into redux store
const store = createStore(
  rootReducer,
  defaults,
  DEBUG ? applyMiddleware(logger) : undefined
);

render((
    <HashRouter>
        <Provider store={store}>
            <Main />
        </Provider>
    </HashRouter>
), document.getElementById('root'));
registerServiceWorker();
