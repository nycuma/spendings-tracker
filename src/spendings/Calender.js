import React from 'react';
import ReactDOM from 'react-dom';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import TotalAmountDay from './TotalAmountDay';
import { Settings } from '../utils/Constants';
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
                {/*<h2>Calender</h2>*/}
                <DayPicker
                    todayButton="Today"
                    firstDayOfWeek={Settings.FIRST_DAY_WEEK}
                    modifiers={modifiers}
                    modifiersStyles={modifiersStyles}
                    onDayClick={this.props.updateSelectedDay}
                    onDayMouseEnter={this.displayAmountSpent}
                    onDayMouseLeave={this.hideAmountSpent} />
                {/*<p>You selected {dateFnsFormat(this.props.selectedDay, Constants.DATE_FORMAT)}</p>*/}
            </div>  
        );
    }
}

export default Calender;