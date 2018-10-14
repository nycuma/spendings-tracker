import React from 'react';
import dateFnsFormat from 'date-fns/format';
import SpendingsSingleDay from './SpendingsSingleDay';
import { Constants } from '../utils/Constants';

class SpendingsDayOverview extends React.Component {
    render() {
        return( 
            <div id="spendings-day-overview" className="box">
                <h2>Details for {dateFnsFormat(this.props.selectedDay, Constants.DATE_FORMAT)}</h2>
                <SpendingsSingleDay 
                    totalAmountDay={this.props.totalAmountDay}
                    spendingsForDay={this.props.spendingsForDay}/>
                {/* <SpendingsForm 
                    selectedDay={this.props.selectedDay}
                    addSpendingsPosition={this.props.addSpendingsPosition} />  */}
            </div>

        ); 
    }
}

export default SpendingsDayOverview;