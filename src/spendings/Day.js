import React from 'react';
import { Constants, Settings } from '../utils/Constants';

class Day extends React.Component {
    
    render() {
        let day = this.props.i < 10 ? '0'+this.props.i : this.props.i;
        return( 
            <tr key={day} className={this.props.i === this.props.selectedDay.getDate() ? 'active-day' : ''}>
                <td className="tbl-data-day">{day}</td>
                <td className="tbl-data-amount">
                    {this.props.totalAmount.toLocaleString(Settings.LOCALE_CURRENCY, Constants.LOCALE_CURRENCY_OPTIONS)}
                </td>
            </tr> 
        ); 
    }
}

export default Day;