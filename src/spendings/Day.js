import React from 'react';
import Constants from '../utils/Constants';

class Day extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            totalAmount : 0.0
        };
    }

    render() {
        let day = this.props.i < 10 ? '0'+this.props.i : this.props.i;
        return( 
            <tr key={day} className={this.props.i === this.props.selectedDay.getDate() ? 'active-day' : ''}>
                <td className="tbl-data-day">{day}</td>
                <td className="tbl-data-amount">
                    {this.state.totalAmount.toLocaleString('de-DE', { 
                        style: 'currency', 
                        currency: Constants.CURRENCY, 
                        minimumFractionDigits: 2, 
                        maximumFractionDigits: 2 
                    })}
                </td>
            </tr> 
        ); 
    }
}

export default Day;