import React from 'react';
import { loadCurrency, loadLocale, loadCategories, 
    saveCurrency, saveLocale, saveCategories } from './LocalStore';
import { Constants } from './Constants';

const { Provider, Consumer } = React.createContext();

class PreferenceProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currency: Constants.DEFAULT_CURRENCY,
            locale: Constants.DEFAULT_LOCALE,
            categories: Constants.DEFAULT_CATEGORIES
        }
    }

    componentDidMount() {
        // load preferences from local storage
        this.setState({
            currency: loadCurrency() || Constants.DEFAULT_CURRENCY,
            locale: loadLocale() || Constants.DEFAULT_LOCALE,
            categories: loadCategories() || Constants.DEFAULT_CATEGORIES
        });
    }

    componentWillUnmount() {
        saveCurrency(this.state.currency);
        saveLocale(this.state.locale);
        saveCategories(this.state.categories);
    }

    updateCurrency = (e) => {
        this.setState({ currency: e.target.value });
    }   

    updateLocale = (e) => {
        this.setState({ locale: e.target.value });
    }  

    addCategory = (newVal) => {
        this.setState({ categories: [...this.state.categories, newVal] });
    }

    removeCategory = (catValue) => {
        this.setState({ categories: this.state.categories.filter(cat => cat.value !== catValue) });
    }

    render() {
        return (
            <Provider value={{
                ...this.state,
                updateCurrency: this.updateCurrency,
                updateLocale: this.updateLocale,
                addCategory: this.addCategory,
                removeCategory: this.removeCategory
            }}>
                {this.props.children} 
            </Provider>
        );
    }
}

export { PreferenceProvider, Consumer as PreferenceConsumer };