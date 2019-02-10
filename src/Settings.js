import React from 'react';
import { Constants } from './utils/Constants';
import { PreferenceContext, CategoriesContext } from './utils/Contexts';
import './settings/TilesSettings.css';

class Settings extends React.Component {

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
                            <PreferenceContext.Consumer>
                            {({currency, locale, updateCurrency, updateLocale }) => (
                            <tbody>
                                <tr>
                                    <td className="prefTitle">Currency</td>
                                    <td><span className="font-small-colored">{currency}</span></td>
                                    <td>
                                        Update: <select value={currency} onChange={(e) => updateCurrency(e)}>{currencyOptions}</select>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="prefTitle">Locale</td>
                                    <td><span className="font-small-colored">{locale}</span></td>
                                    <td>
                                        Update: <select value={locale} onChange={(e) => updateLocale(e)}>{localeOptions}</select>
                                    </td>
                                </tr>
                            </tbody>
                            )}
                            </PreferenceContext.Consumer>


                            <CategoriesContext.Consumer>
                                {(categories, addCategory, removeCategory) => {
                                    let categoryTbl = categories.categories.map(cat => (
                                        <tr className="reducedPadding" key={cat.value}>
                                            <td><span className="font-small-colored">{cat.label}</span></td>
                                            <td><button className="btnDelete" title="Delete" onClick={() => categories.removeCategory(cat.value)}>X</button></td>
                                        </tr>));

                                    return (
                                        <tbody>
                                            <tr>
                                                <td className="prefTitle" rowSpan={categoryTbl.length + 1}>Categories</td>
                                            </tr>
                                            {categoryTbl}
                                        </tbody>
                                    );
                                }}

        
            
                            </CategoriesContext.Consumer>

                            
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