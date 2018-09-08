import React from 'react';
import Calender from './spendings/Calender';
import SpendingsForm from './spendings/SpendingsForm';
import Utils from './utils/Utils';
import exampleData from './utils/ExampleData';

class Spendings extends React.Component {
    constructor(props) {
        super(props);
        this.updateSelectedDay = this.updateSelectedDay.bind(this);
        this.addSpendingsPosition = this.addSpendingsPosition.bind(this);
        this.state = {
            selectedDay: new Date(),
            spendingPositions: exampleData
        };
    }

    updateSelectedDay(day) {
        this.setState({ selectedDay: day });
    }

    addSpendingsPosition(cat, amount, comment) {
        this.setState( {
            spendingPositions: this.state.spendingPositions.concat({
                day: this.state.selectedDay,
                cat: cat,
                amount: amount,
                comment: comment
            })
        });
    }

    /**
     * Returns an array that contains the total amount of
     * money spent on each day for an entire month.
     * Position i contains amount for (i+1)th day of the month.
     * 
     * @param month integer indicating the month (Jan=0, Dec=11)
     */
    calculateTotalAmoutsPerDay(month) {
        // init array with 0.00 as default value
        let totalAmounts = new Array(Utils.getNumDaysOfMonth(this.state.selectedDay)).fill(0);
        this.state.spendingPositions.filter((item) => {
            return item.day.getMonth() === month;
        }).forEach((item) => {
            totalAmounts[item.day.getDate()-1] += item.amount;
        });

        return totalAmounts;
    }

    render() {
        let totalAmountsPerDay = this.calculateTotalAmoutsPerDay(this.state.selectedDay.getMonth());

        return (
            <div id="spendings">
                <h1 className="menu-item-headline">Spendings</h1>
                <Calender 
                    totalAmountsPerDay={totalAmountsPerDay}
                    selectedDay={this.state.selectedDay}
                    updateSelectedDay={this.updateSelectedDay} />
                <SpendingsForm 
                    selectedDay={this.state.selectedDay}
                    addSpendingsPosition={this.addSpendingsPosition} /> 
            </div>
        );
    }
}

export default Spendings;