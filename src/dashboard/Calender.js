import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import TotalAmountDay from './TotalAmountDay';
import { Constants } from '../utils/Constants';
import { getSpendings } from './../utils/LocalStore';
import Utils from './../utils/Utils';
import './Calender.css';
import 'react-day-picker/lib/style.css';


class Calender extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            daysWithSpendings: this.getDaysWithSpendings()
        };
    }

    getTotalAmountForDay(date) {
        let spendings = getSpendings(date);
        return Utils.calculateSumOfSpendings(spendings);
    }

    displayAmountSpent(day, modifiers, e) {
        let amountSpent = this.getTotalAmountForDay(day);
        if(amountSpent && amountSpent > 0) {
            let position = {top: e.pageY, left: e.pageX};
            ReactDOM.render(<TotalAmountDay position={position} totalAmountDay={amountSpent} />, 
                        document.getElementById('total-amount-day'));
        }
    }

    hideAmountSpent() {
        // remove component when mouse leaves day-picker
        ReactDOM.unmountComponentAtNode(document.getElementById('total-amount-day'));
    }

    getDaysWithSpendings(date) {
        date = date ? date : this.props.selectedDay;
        let daysOfMonth = new Set();
        // get all spendings of current month
        let spendingsMonth = getSpendings(date, false, true, true);
        // get all days on which sth. was spent in this month
        spendingsMonth.forEach(spending => daysOfMonth.add(new Date(spending.day).getDate()));

        return [...daysOfMonth].map(day => new Date(date.getFullYear(),
                                                    date.getMonth(), 
                                                    day));
    }

    updateDaysWithSpendings(date) {
        this.setState({ daysWithSpendings: this.getDaysWithSpendings(date) });
    }


    render() {
        const modifiers = {
            weekend: { daysOfWeek: [6, 0] },
            today: new Date(),
            selectedDay: this.props.selectedDay,
            dayWithSpending: this.state.daysWithSpendings
        };
        const modifiersStyles = {
            today : {
                color: '#58747E'
            },
            weekend: {
                color: '#7E6258'
            },
            selectedDay: {
                color: 'white',
                backgroundColor: '#7E6258',
            },
            dayWithSpending: {
                fontWeight: 'bold',
                fontSize: 'larger'
            }
        };

        return (
            <div id="calender" className="box">
                <DayPicker
                    todayButton="Today"
                    firstDayOfWeek={Constants.FIRST_DAY_WEEK}
                    modifiers={modifiers}
                    modifiersStyles={modifiersStyles}
                    onDayClick={this.props.updateSelectedDay}
                    onDayMouseEnter={(day, mod, e) => this.displayAmountSpent(day, mod, e)}
                    onDayMouseLeave={this.hideAmountSpent} 
                    onMonthChange={(date) => this.updateDaysWithSpendings(date)}
                />

                <div className="box add-actions">
                    <span className="add-action" onClick={this.props.openAddModal}>
                        <button className="add-pos-btn">+</button> 
                        Add new spendings position
                    </span>
                    <span className="add-action" onClick={this.props.openImportModal}>
                        <button className="add-pos-btn" >+</button>
                        Import from JSON
                    </span>
                </div> 
            </div>  
        );
    }
}

Calender.propTypes = {
    selectedDay: PropTypes.instanceOf(Date).isRequired,
    updateSelectedDay: PropTypes.func.isRequired,
    openAddModal: PropTypes.func.isRequired,
    openImportModal: PropTypes.func.isRequired
};

export default Calender;