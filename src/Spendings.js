import React from 'react';
import { DateUtils } from "react-day-picker";
import Calender from './spendings/Calender';
import Utils from './utils/Utils';
import exampleData from './utils/ExampleData';
import SpendingsDayOverview from './spendings/SpendingsDayOverview';

class Spendings extends React.Component {
    constructor(props) {
        super(props);
        this.updateSelectedDay = this.updateSelectedDay.bind(this);
        this.addSpendingsPosition = this.addSpendingsPosition.bind(this);
        this.calculateTotalAmountAnyDay = this.calculateTotalAmountAnyDay.bind(this);
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

    calculateTotalAmountMonth() {
        let spendingsMonth = this.getSpendingPositionsForSelectedMonth();
        if (spendingsMonth) {
            return spendingsMonth.map((item) => {
                return item.amount;
            }).reduce((prevAmount, nextAmount) => {
                return prevAmount + nextAmount;
            }, 0);
        }
        return 0;
    }

    calculateTotalAmountAnyDay(date) {
        let spendings = this.getSpendingPositionsForDay(date);
        if (spendings) {
            return spendings.map((item) => {
                return item.amount;
            }).reduce((prevAmount, nextAmount) => {
                return prevAmount + nextAmount;
            }, 0);
        }
        return 0;
    }

    /**
     * Returns all spending positions for the currently
     * selected calender day
     */
    getSpendingPositionsForSelectedDay() {
        return this.getSpendingPositionsForDay(this.state.selectedDay);
    }

    getSpendingPositionsForDay(date) {
        return this.state.spendingPositions.filter((pos) => {
            return DateUtils.isSameDay(pos.day, date);
        });
    }

    getSpendingPositionsForSelectedMonth() {
        return this.state.spendingPositions.filter((pos) => {
            return DateUtils.isSameMonth(pos.day, this.state.selectedDay);
        });
    }

    render() {
        let totalAmountsPerDay = this.calculateTotalAmoutsPerDay(this.state.selectedDay.getMonth());

        return (
            <div id="spendings">
                <h1 className="menu-item-headline">Spendings</h1>
                <Calender 
                    totalAmountsPerDay={totalAmountsPerDay}
                    totalAmountMonth={this.calculateTotalAmountMonth()}
                    selectedDay={this.state.selectedDay}
                    updateSelectedDay={this.updateSelectedDay} 
                    calculateTotalAmountAnyDay={this.calculateTotalAmountAnyDay} />

                <SpendingsDayOverview
                    spendingsForDay={this.getSpendingPositionsForSelectedDay()}
                    selectedDay={this.state.selectedDay}
                    addSpendingsPosition={this.addSpendingsPosition} /> 
            </div>
        );
    }
}

export default Spendings;