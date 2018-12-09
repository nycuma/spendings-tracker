import React from 'react';
import { Constants, Settings } from '../utils/Constants';
import './TotalAmountDay.css';

/**
 * Displays amount spent on a day when hovering over specific day
 * in the DayPicker
 */
class TotalAmountDay extends React.Component {
    
    render() {
        return( 
            <div className="hover-total-amount-day" style={this.props.position}>
                {this.props.totalAmountDay.toLocaleString(Settings.CURRENCY, Constants.LOCALE_CURRENCY_OPTIONS)}
            </div> 
        ); 
    }
}

export default TotalAmountDay;