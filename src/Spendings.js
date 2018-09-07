import React from 'react';
import Calender from './spendings/Calender';
import SpendingsForm from './spendings/SpendingsForm';

class Spendings extends React.Component {
    constructor(props) {
        super(props);
        this.updateSelectedDay = this.updateSelectedDay.bind(this);
        this.state = {
            selectedDay: new Date(),
            totalAmount: 0.0
        };
    }

    updateSelectedDay(day) {
        this.setState({
            selectedDay: day
        });
    }

    render() {
        return (
            <div id="spendings">
                <h1 className="menu-item-headline">Spendings</h1>
                <Calender 
                    selectedDay={this.state.selectedDay}
                    updateSelectedDay={this.updateSelectedDay}
                    totalAmount={this.state.totalAmount}/>
                <SpendingsForm 
                    selectedDay={this.state.selectedDay}/> 
            </div>
        );
    }
}

export default Spendings;