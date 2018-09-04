import React from 'react';
import DayPicker from 'react-day-picker';
import dateFnsFormat from 'date-fns/format';
import 'react-day-picker/lib/style.css';
import Utils from '../utils/Utils';

class Calender extends React.Component {
    constructor(props) {
        super(props);
        this.handleDayClick = this.handleDayClick.bind(this);
        this.state = {
            selectedDay : new Date()
        };
    }

    handleDayClick(day) {
        this.setState({ selectedDay: day });
    }

    renderTableMonth() {
        let numRows = Utils.getNumDaysOfMonth(this.state.selectedDay);

        let tblRows = [];
        for(let i = 1; i <= numRows; i++) {   
            let day = i < 10 ? '0'+i : i;
            tblRows.push(
                <tr key={day} className={i === this.state.selectedDay.getDate() ? 'active-day' : ''}>
                    <td>{day}</td>
                    <td>0.00 €</td>
                </tr> 
            );
        }

        return (
            <table id="table-spendings">
                <thead>
                    <tr>
                        <th>{dateFnsFormat(this.state.selectedDay, 'MMMM YYYY')}</th>
                    </tr>
                </thead>
                <tbody>
                    {tblRows} 
                </tbody>
            </table>
        );
    }




    render() {
        const DATE_FORMAT = 'DD MMM YYYY';

        return (
            <div className="section-left box">
                <h2>Calender</h2>
                <DayPicker
                    todayButton="Today"
                    firstDayOfWeek={1}
                    onDayClick={this.handleDayClick}
                />
                {this.state.selectedDay ? 
                    (<p>Selected day: {dateFnsFormat(this.state.selectedDay, DATE_FORMAT)}</p>) 
                    : (<p>Please select a day</p>)}

                {this.renderTableMonth()}
            </div>
            
        );
    }

}

export default Calender;