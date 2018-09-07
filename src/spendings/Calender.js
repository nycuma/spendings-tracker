import React from 'react';
import DayPicker from 'react-day-picker';
import dateFnsFormat from 'date-fns/format';
import 'react-day-picker/lib/style.css';
import Day from './Day';
import Utils from '../utils/Utils';
import Constants from '../utils/Constants';


class Calender extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           
        };
    }

    renderTableMonth() {
        let numRows = Utils.getNumDaysOfMonth(this.props.selectedDay);
        let tblRows = [];
        for(let i = 1; i <= numRows; i++) {   
            tblRows.push(
                <Day i={i} selectedDay={this.props.selectedDay} />
            );
        }

        return (
            <table id="table-spendings">
                <thead>
                    <tr>
                        <th>{dateFnsFormat(this.props.selectedDay, 'MMMM YYYY')}</th>
                    </tr>
                </thead>
                <tbody>
                    {tblRows} 
                </tbody>
            </table>
        );
    }

    render() {
        

        return (
            <div className="section-left box">
                <h2>Calender</h2>
                <DayPicker
                    todayButton="Today"
                    firstDayOfWeek={1}
                    onDayClick={this.props.updateSelectedDay}
                />
                <p>Selected day: {dateFnsFormat(this.props.selectedDay, Constants.DATE_FORMAT)}</p>
                {this.renderTableMonth()}
            </div>
            
        );
    }

}

export default Calender;