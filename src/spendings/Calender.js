import React from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

class Calender extends React.Component {

    render() {
        return (
            <div className="section-left box">
                <h2>Calender</h2>
                <DayPicker firstDayOfWeek={1}/>
                <br />Current date: Sep 1st
            </div>
            
        );
    }

}

export default Calender;