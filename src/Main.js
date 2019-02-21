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
import './style.scss';

class Main extends Component {
    constructor(props) {
        super(props);
        this.updateCurrency = this.updateCurrency.bind(this);
        this.updateLocale = this.updateLocale.bind(this);
        this.addCategory = this.addCategory.bind(this);
        this.removeCategory = this.removeCategory.bind(this);

        this.state = {
            currency: loadCurrency() || Constants.DEFAULT_CURRENCY,
            locale: loadLocale() || Constants.DEFAULT_LOCALE,
            categories: loadCategories() || Constants.DEFAULT_CATEGORIES
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
                categories: this.state.categories,
                updateCurrency: this.updateCurrency,
                updateLocale: this.updateLocale,
                addCategory: this.addCategory,
                removeCategory: this.removeCategory
            }}>
                <Switch>
                    <Route exact path={Constants.BASE_URL + '/'} component={Dashboard}/>
                    <Route path={Constants.BASE_URL + '/dashboard'} component={Dashboard}/>
                    <Route path={Constants.BASE_URL + '/analytics'} component={Analytics}/>
                    <Route path={Constants.BASE_URL + '/settings'} component={Settings}/>
                </Switch>
            </PreferenceContext.Provider>
        </div>
        );
    }
    
}

export default Main;

