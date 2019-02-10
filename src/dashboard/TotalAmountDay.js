import React from 'react';
import { Constants } from '../utils/Constants';
import './TotalAmountDay.css';
import { PreferenceContext } from '../utils/Contexts';

/**
 * Displays amount spent on a day when hovering over specific day
 * in the DayPicker
 */
class TotalAmountDay extends React.Component {
    
    render() {
        return (
            <PreferenceContext.Consumer>
                {({ currency, locale }) => (
                    <div className="hover-total-amount-day" style={this.props.position}>
                        {this.props.totalAmountDay.toLocaleString(locale, { ...Constants.DEFAULT_CURRENCY_OPTIONS, ...{ currency: currency }})}
                    </div>
                )}
            </PreferenceContext.Consumer>
        ); 
    }
}

export default TotalAmountDay;