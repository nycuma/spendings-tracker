import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { reducer } from './utils/ReduxStore';
import Main from './Main';
import registerServiceWorker from './registerServiceWorker';
import './style.scss';

const store = createStore(reducer);

render((
        <HashRouter>
            <Provider store={store}>
                <Main />
            </Provider>
        </HashRouter>
    ), document.getElementById('root'));
registerServiceWorker();
