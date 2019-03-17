import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DayPicker from 'react-day-picker';
import TooltipAmountDay from './TooltipAmountDay';
import { Constants } from '../utils/Constants';
import Utils from './../utils/Utils';
import './Calender.scss';
import 'react-day-picker/lib/style.css';

const mapStateToProps = (state) => ({ spendings: state.spendings });

class Calender extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            daysWithSpendings: this.getDaysWithSpendings()
        };
    }

    componentDidUpdate(prevProps) {
        if(prevProps.spendings.length !== this.props.spendings.length) {
            // update amounts when new spending(s) are added 
            this.updateDaysWithSpendings();
        }
    }

    displayAmountSpent(day, modifiers, e) {
        day = day.getDate();
        const dayState = this.state.daysWithSpendings[day];
        if(dayState) {
            dayState.style = { top: e.pageY, left: e.pageX-50 };
            this.setState({ daysWithSpendings: {...this.state.daysWithSpendings, ...{ [day]: dayState } } });
        }
    }

    hideAmountSpent(day) {
        day = day.getDate();
        const dayState = this.state.daysWithSpendings[day];
        if(dayState) {
            dayState.style = { display: 'none' };
            this.setState({ daysWithSpendings: {...this.state.daysWithSpendings, ...{ [day]: dayState } } });
        }
    }

    getDaysWithSpendings(date) {
        date = date ? date : this.props.selectedDay;
        // get all spendings of current month
        const spendingsMonth = Utils.filterSpendingsByMonth(this.props.spendings, date);
        // get all days on which sth. was spent in this month and add up amounts
        const daysWithSpendings = {};
        spendingsMonth.forEach(spending => {
            const day = new Date(spending.day).getDate();
            if(!daysWithSpendings[day]) {
                daysWithSpendings[day] = { 
                    date: new Date(spending.day),
                    amount: spending.amount,
                    style: { display: 'none' } 
                };
            } else {
                daysWithSpendings[day].amount += spending.amount;
            }
        });

        return daysWithSpendings;
    }

    updateDaysWithSpendings(date) {
        this.setState({ daysWithSpendings: this.getDaysWithSpendings(date) });
    }

    render() {
        const modifiers = {
            weekend: { daysOfWeek: [6, 0] },
            today: new Date(),
            selectedDay: this.props.selectedDay,
            dayWithSpending: Object.values(this.state.daysWithSpendings).map(item => item.date)
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
                fontWeight: 'bold'
            }
        };


        const tooltips = Object.keys(this.state.daysWithSpendings).map(day =>
            (<TooltipAmountDay 
                key={day} 
                amount={this.state.daysWithSpendings[day].amount} 
                style={this.state.daysWithSpendings[day].style} 
            />)
        );

        return (
            <div id="calender" className="box">
                <DayPicker
                    todayButton="Today"
                    firstDayOfWeek={Constants.FIRST_DAY_WEEK}
                    modifiers={modifiers}
                    modifiersStyles={modifiersStyles}
                    onDayClick={this.props.updateSelectedDay}
                    onDayMouseEnter={(day, mod, e) => this.displayAmountSpent(day, mod, e)}
                    onDayMouseLeave={(day, mod, e) => this.hideAmountSpent(day, mod, e)} 
                    onMonthChange={(date) => this.updateDaysWithSpendings(date)}
                />

                <div>
                    {tooltips}
                </div>

                <div className="box add-actions">
                    <span className="add-action" onClick={this.props.openAddModal}>
                        <button className="add-pos-btn">+</button> 
                        Add spending
                    </span>
                    <span className="add-action" onClick={this.props.openImportModal}>
                        <button className="add-pos-btn">+</button>
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
    openImportModal: PropTypes.func.isRequired,
    spendings: PropTypes.arrayOf(PropTypes.object)
};

export default connect(mapStateToProps)(Calender);