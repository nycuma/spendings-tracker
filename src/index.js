import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import { HashRouter } from 'react-router-dom';
import { rootReducer } from './utils/ReduxStore';
import Main from './Main';
import registerServiceWorker from './registerServiceWorker';
import { getSpendings } from './utils/LocalStore';
import './style.scss';

//  pre-load all spenings into redux store
const store = createStore(
  rootReducer,
  { spendings: getSpendings() || [] },
  applyMiddleware(logger)
);

render((
        <HashRouter>
            <Provider store={store}>
                <Main />
            </Provider>
        </HashRouter>
    ), document.getElementById('root'));
registerServiceWorker();
