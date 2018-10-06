import React from 'react';
import ReactDOM from 'react-dom';
import DayPicker from 'react-day-picker';
import dateFnsFormat from 'date-fns/format';
import 'react-day-picker/lib/style.css';
import TotalAmountDay from './TotalAmountDay';
import { Constants, Settings } from '../utils/Constants';
import './Calender.css';


class Calender extends React.Component {
    constructor(props) {
        super(props);
        this.displayAmountSpent = this.displayAmountSpent.bind(this);
        /*
        this.state = {
            dateDisplayingAmount: null
        };
        */
    }

    displayAmountSpent(day, modifiers, evt) {
        //this.setState({ dateDisplayingAmount: day });

        let amountSpent = this.props.calculateTotalAmountAnyDay(day);
        if(amountSpent && amountSpent > 0) {
            let position = {top: evt.pageY, left: evt.pageX};
            ReactDOM.render(<TotalAmountDay position={position} totalAmountDay={amountSpent} />, 
                        document.getElementById('total-amount-day'));
        }
        
    }

    hideAmountSpent(day, modifiers, evt) {
        // TODO remove component when mouse leaves day-picker
        ReactDOM.unmountComponentAtNode(document.getElementById('total-amount-day'));
    }

    renderTableSums() {
        // TODO 2

        return (

            <table id="table-spendings">
                <thead>
                    <tr>
                        <th colSpan="2">Total spendings...</th>
                    </tr>

                </thead>
                <tbody>
                     <tr>
                        <td>...this day:</td>
                        <td>{this.props.totalAmountDay.toLocaleString(Settings.LOCALE_CURRENCY, Constants.LOCALE_CURRENCY_OPTIONS)}</td>
                    </tr>
                    <tr>
                        <td>...this week:</td>
                        <td>{this.props.totalAmountWeek.toLocaleString(Settings.LOCALE_CURRENCY, Constants.LOCALE_CURRENCY_OPTIONS)}</td>
                    </tr>
                    <tr>
                        <td>...this month:</td>
                        <td>{this.props.totalAmountMonth.toLocaleString(Settings.LOCALE_CURRENCY, Constants.LOCALE_CURRENCY_OPTIONS)}</td>
                    </tr>
                    <tr>
                        <td>...this year:</td>
                        <td>{this.props.totalAmountYear.toLocaleString(Settings.LOCALE_CURRENCY, Constants.LOCALE_CURRENCY_OPTIONS)}</td>
                    </tr>
                </tbody>
            </table>
        );
    }

    render() {
        return (
            <div className="section-left box">
                {/*<h2>Calender</h2>*/}
                <DayPicker
                    todayButton="Today"
                    firstDayOfWeek={Settings.FIRST_DAY_WEEK}
                    onDayClick={this.props.updateSelectedDay}
                    onDayMouseEnter={this.displayAmountSpent}
                    onDayMouseLeave={this.hideAmountSpent} />
                <p>Selected day: {dateFnsFormat(this.props.selectedDay, Constants.DATE_FORMAT)}</p>
                {this.renderTableSums()}
            </div>
            
        );
    }

}

export default Calender;