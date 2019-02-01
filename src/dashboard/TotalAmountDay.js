import React from 'react';
import { prefs } from '../utils/Constants';
import './TotalAmountDay.css';

/**
 * Displays amount spent on a day when hovering over specific day
 * in the DayPicker
 */
class TotalAmountDay extends React.Component {
    
    render() {
        return( 
            <div className="hover-total-amount-day" style={this.props.position}>
                {this.props.totalAmountDay.toLocaleString(prefs.locale, prefs.currencyOptions)}
            </div> 
        ); 
    }
}

export default TotalAmountDay;