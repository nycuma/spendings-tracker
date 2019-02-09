import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './Header';
import Dashboard from './Dashboard';
import Analytics from './Analytics';
import Settings from './Settings';
import Sidebar from './Sidebar';
import { loadCurrency, loadLocale, loadCategories, 
    saveCurrency, saveLocale, saveCategories } from './utils/LocalStore';
import { Constants } from './utils/Constants';
import { PreferenceContext } from './utils/Contexts';
import './style.css';

class Main extends Component {
    constructor(props) {
        super(props);
        this.updateCurrency = this.updateCurrency.bind(this);
        this.updateLocale = this.updateLocale.bind(this);
        this.addCategory = this.addCategory.bind(this);
        this.removeCategory = this.removeCategory.bind(this);

        let storedCurrency = loadCurrency() || Constants.DEFAULT_CURRENCY;
        let storedLocale = loadLocale() || Constants.DEFAULT_LOCALE;
        let storedCats = loadCategories() || Constants.DEFAULT_CATEGORIES;

        this.state = {
            currency: storedCurrency,
            locale: storedLocale,
            categories: storedCats
        };

        this.currencyOptions = {
            style: 'currency',
            currency: this.state.currency,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }; 
    }

    componentWillUnmount() {
        saveCurrency(this.state.currency);
        saveLocale(this.state.locale);
        saveCategories(this.state.categories);
    }

    updateCurrency(e) {
        this.setState({ currency: e.target.value });
    }   

    updateLocale(e) {
        this.setState({ locale: e.target.value });
    }  

    addCategory(newVal) {
        this.setState({ categories: [...this.state.categories, newVal] });
    }

    removeCategory(catValue) {
        let index = this.state.categories.findIndex(cat => cat.value === catValue);
        let copy = this.state.categories.slice();
        copy.splice(index, 1);
        this.setState({ categories: copy });
    }

    render() {

        return (
        <div id="main-container"> 
            <Header />
            <nav className="box">
                <Sidebar />
            </nav>
            <PreferenceContext.Provider value={{
                currency: this.state.currency,
                locale: this.state.locale,
                updateCurrency: this.updateCurrency,
                updateLocale: this.updateLocale
            }}>
                <Switch>
                    <Route exact path='/' component={Dashboard}/>
                    <Route path='/dashboard' component={Dashboard}/>
                    <Route path='/analytics' component={Analytics}/>
                    <Route path='/settings' component={Settings}/>
                </Switch>
            </PreferenceContext.Provider>
        </div>
        );
    }
    
}

export default Main;

