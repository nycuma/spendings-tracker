import React from 'react';
import dateFnsFormat from 'date-fns/format';
import SpendingsSingleDay from './SpendingsSingleDay';
import SpendingsForm from './SpendingsForm';
import { Constants } from '../utils/Constants';

class SpendingsDayOverview extends React.Component {
    render() {
        return( 
            <div className="box">
                <h2>Spendings for {dateFnsFormat(this.props.selectedDay, Constants.DATE_FORMAT)}</h2>
                <SpendingsSingleDay 
                    spendingsForDay={this.props.spendingsForDay}/>
                <SpendingsForm 
                    selectedDay={this.props.selectedDay}
                    addSpendingsPosition={this.props.addSpendingsPosition} /> 
            </div>

        ); 
    }
}

export default SpendingsDayOverview;