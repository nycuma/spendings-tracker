import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './Header';
import Dashboard from './Dashboard';
import Analytics from './Analytics';
import Settings from './Settings';
import Sidebar from './Sidebar';
import { loadCurrency, loadLocale, loadCategories } from './utils/LocalStore';
import { prefs } from './utils/Constants';
import './style.css';

class Main extends Component {
    constructor(props) {
        super(props);
        let storedCurrency = loadCurrency();
        if(storedCurrency) {
            prefs.currency = storedCurrency;
        }

        let storedLocale = loadLocale();
        if(storedLocale) {
            prefs.locale = storedLocale;
        }

        let storedCats = loadCategories();
        if(storedCats) {
            prefs.spendingCats = storedCats;
        }
    }

    render() {
        return (
        <div id="main-container"> 
            <Header />
            <nav className="box">
                <Sidebar />
            </nav> 
            <Switch>
                <Route exact path='/' component={Dashboard}/>
                <Route path='/dashboard' component={Dashboard}/>
                <Route path='/analytics' component={Analytics}/>
                <Route path='/settings' component={Settings}/>
            </Switch>
        </div>
        );
    }
    
}

export default Main;

