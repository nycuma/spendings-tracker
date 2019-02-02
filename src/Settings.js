import React from 'react';
import { Constants, prefs } from './utils/Constants';
import { saveCurrency, saveLocale } from './utils/LocalStore';
import './settings/TilesSettings.css';

class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currency: prefs.currency,
            locale: prefs.locale
        };
    }

    componentWillUnmount() {
        prefs.currency = this.state.currency;
        prefs.locale = this.state.locale;
        saveCurrency(this.state.currency);
        saveLocale(this.state.locale);
    }

    updateCurrency(e) {
        this.setState({ currency: e.target.value });
    }

    updateLocale(e) {
        this.setState({ locale: e.target.value });
    }

    render() {
        let currencyOptions = Constants.CURRENCIES.map(curr => 
            (<option key={curr.code} value={curr.code}>{curr.name} ({curr.symbol})</option>));

        let localeOptions = Constants.LOCALES.map(loc => (<option key={loc} value={loc}>{loc}</option>));
    
        return (
            <div id="settings" className="box">
                <h1 className="menu-item-headline">Settings</h1>
                    <div className="tileSetting">
                        <h4>Preferences</h4>
                        <table>
                            <tbody>
                                <tr>
                                    <td><h5>Currency</h5></td>
                                    <td><span className="font-small-colored">{this.state.currency}</span></td>
                                    <td>
                                        Update: <select value={this.state.currency} onChange={(e) => this.updateCurrency(e)}>{currencyOptions}</select>
                                    </td>
                                </tr>
                                <tr>
                                    <td><h5>Locale</h5></td>
                                    <td><span className="font-small-colored">{this.state.locale}</span></td>
                                    <td>
                                        Update: <select value={this.state.locale} onChange={(e) => this.updateLocale(e)}>{localeOptions}</select>
                                    </td>
                                </tr>
                            </tbody>
                        </table>  
                    </div>

                    <div className="tileSetting">
                        <h4>Recurrent Spendings</h4>
                    </div>

            </div>
        );
    }
}

export default Settings;