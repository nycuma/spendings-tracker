import React from 'react';
import ReactDOM from 'react-dom';
import './style.scss';
import Main from './Main';
import { HashRouter } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render((
        <HashRouter>
            <Main />
        </HashRouter>
    ), document.getElementById('root'));
registerServiceWorker();
