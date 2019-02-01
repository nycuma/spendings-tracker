import React from 'react';
import ReactDOM from 'react-dom';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import TotalAmountDay from './TotalAmountDay';
import { prefs } from '../utils/Constants';
import { getSpendings } from './../utils/LocalStore';
import Utils from './../utils/Utils';
import './Calender.css';
import 'react-day-picker/lib/style.css';


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

    getTotalAmountForDay(date) {
        let spendings = getSpendings(date);
        return Utils.calculateSumOfSpendings(spendings);
    }

    displayAmountSpent(day, modifiers, evt) {
        //this.setState({ dateDisplayingAmount: day });

        let amountSpent = this.getTotalAmountForDay(day);
        if(amountSpent && amountSpent > 0) {
            let position = {top: evt.pageY, left: evt.pageX};
            ReactDOM.render(<TotalAmountDay position={position} totalAmountDay={amountSpent} />, 
                        document.getElementById('total-amount-day'));
        }
        
    }

    hideAmountSpent(day, modifiers, evt) {
        // remove component when mouse leaves day-picker
        ReactDOM.unmountComponentAtNode(document.getElementById('total-amount-day'));
    }



    render() {
        const modifiers = {
            weekend: { daysOfWeek: [6, 0] },
            today: new Date(),
            selectedDay: this.props.selectedDay,
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
            }
          };

        return (
            <div id="calender" className="box">
                <DayPicker
                    todayButton="Today"
                    firstDayOfWeek={prefs.firstDayWeek}
                    modifiers={modifiers}
                    modifiersStyles={modifiersStyles}
                    onDayClick={this.props.updateSelectedDay}
                    onDayMouseEnter={this.displayAmountSpent}
                    onDayMouseLeave={this.hideAmountSpent} />

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

export default Calender;