import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Constants } from './utils/Constants';
import { updateCurrency, updateLocale } from './utils/ReduxStore';
import './settings/TilesSettings.scss';

const mapStateToProps = (state) => { 
    return {
        currency: state.settings.currency,
        locale: state.settings.locale,
        categories: state.settings.categories 
    };
    
};

const mapDispatchToProps = dispatch => ({ 
    updateCurrency: e => dispatch(updateCurrency(e.target.value)),
    updateLocale: e => dispatch(updateLocale(e.target.value))
});

function Settings(props) {
    let currencyOptions = Constants.CURRENCIES.map(curr => 
        (<option key={curr.code} value={curr.code}>{curr.name} ({curr.symbol})</option>));

    let localeOptions = Constants.LOCALES.map(loc => (<option key={loc} value={loc}>{loc}</option>));

    let categoryTbl = props.categories.map(cat => (
        <tr className="reducedPadding" key={cat.value}>
            <td><span className="font-small-colored">{cat.label}</span></td>
            <td><button className="btnDelete" title="Delete">X</button></td>
        </tr>));

    return (
        <div id="settings" className="box">
            <h1 className="menu-item-headline">Settings</h1>
                <div className="border-dashed">
                    <h4>Preferences</h4>
                    <table>  
                        <tbody>
                            <tr>
                                <td className="prefTitle">Currency</td>
                                <td><span className="font-small-colored">{props.currency}</span></td>
                                <td>
                                    Update: <select value={props.currency} onChange={(e) => props.updateCurrency(e)}>{currencyOptions}</select>
                                </td>
                            </tr>
                            <tr>
                                <td className="prefTitle">Locale</td>
                                <td><span className="font-small-colored">{props.locale}</span></td>
                                <td>
                                    Update: <select value={props.locale} onChange={(e) => props.updateLocale(e)}>{localeOptions}</select>
                                </td>
                            </tr>
                            <tr>
                                <td className="prefTitle" rowSpan={categoryTbl.length + 1}>Categories</td>
                            </tr>
                            {categoryTbl}
                        </tbody>
                    </table> 
                </div>
                <div className="border-dashed">
                    <h4>Recurrent Spendings</h4>
                </div>
        </div>
    );
}

Settings.propTypes = {
    currency: PropTypes.string.isRequired,
    locale: PropTypes.string.isRequired,
    categories: PropTypes.arrayOf(PropTypes.object),
    updateCurrency: PropTypes.func.isRequired,
    updateLocale: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);