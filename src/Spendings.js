import React from 'react';
import { DateUtils } from "react-day-picker";
import Calender from './spendings/Calender';
import Utils from './utils/Utils';
import exampleData from './utils/ExampleData';
import SpendingsDayOverview from './spendings/SpendingsDayOverview';
import AddForm from './spendings/AddForm';
import './spendings/Spendings.css';


class Spendings extends React.Component {
    constructor(props) {
        super(props);
        this.updateSelectedDay = this.updateSelectedDay.bind(this);
        this.addSpendingsPosition = this.addSpendingsPosition.bind(this);
        this.calculateTotalAmountAnyDay = this.calculateTotalAmountAnyDay.bind(this);
        this.handleFileUpload = this.handleFileUpload.bind(this);
        this.onClose = this.onClose.bind(this);
        this.state = {
            selectedDay: new Date(),
            spendingPositions: exampleData,
            addFormIsVisible: false
        };
    }

    componentDidMount() {
        this.fileSelector = this.initFileSelector();
    }

    initFileSelector() {
        const fileSelector = document.createElement('input');
        fileSelector.setAttribute('type', 'file');
        fileSelector.setAttribute('multiple', true);
        fileSelector.onchange = this.handleFileUpload;
        return fileSelector;
    }

    updateSelectedDay(day) {
        this.setState({ selectedDay: day });
    }

    addSpendingsPosition(cat, amount, comment, day) {
        this.setState( {
            spendingPositions: this.state.spendingPositions.concat({
                day: day ? new Date(day) : this.state.selectedDay,
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

    calculateTotalAmountWeek() {
        let spendingsWeek = this.getSpendingPositionsForSelectedWeek();
        return this.calculateSumSpendingPositions(spendingsWeek);
    }

    calculateTotalAmountMonth() {
        let spendingsMonth = this.getSpendingPositionsForSelectedMonth();
        return this.calculateSumSpendingPositions(spendingsMonth);
    }

    calculateTotalAmountYear() {
        let spendingsYear = this.getSpendingPositionsForSelectedYear();
        return this.calculateSumSpendingPositions(spendingsYear);
    }

    calculateTotalAmountAnyDay(date) {
        let spendings = this.getSpendingPositionsForDay(date);
        return this.calculateSumSpendingPositions(spendings);
    }

    calculateSumSpendingPositions(positions) {
        if (positions) {
            return positions.map((item) => {
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

    getSpendingPositionsForSelectedWeek() {
        let weekdays = Utils.getDaysOfThisWeek(this.state.selectedDay);

        return this.state.spendingPositions.filter((pos) => {
            return DateUtils.isSameDay(pos.day, this.state.selectedDay)
                || DateUtils.isSameDay(pos.day, weekdays[0])
                || DateUtils.isSameDay(pos.day, weekdays[1])
                || DateUtils.isSameDay(pos.day, weekdays[2])
                || DateUtils.isSameDay(pos.day, weekdays[3])
                || DateUtils.isSameDay(pos.day, weekdays[4])
                || DateUtils.isSameDay(pos.day, weekdays[5]);
        });
    }

    getSpendingPositionsForSelectedMonth() {
        return this.state.spendingPositions.filter((pos) => {
            return DateUtils.isSameMonth(pos.day, this.state.selectedDay);
        });
    }

    getSpendingPositionsForSelectedYear() {
        return this.state.spendingPositions.filter((pos) => {
            return pos.day.getFullYear === this.state.selectedDay.getFullYear;
        });
    }

    openAddModal() {
        this.setState({ addFormIsVisible: true });
    }

    openImportModal(e) {
        e.preventDefault();
        this.fileSelector.click();
    }

    handleFileUpload(e) {
        e.preventDefault();
        let files = e.target.files;
        if(!files) {
            console.log('No files to upload found');
            return;
        }

        for(let i = 0; i < files.length; i++) {
             if(files[i].type === 'application/json') {
                 let reader = new FileReader();

                 reader.onload = () => {
                    let json = JSON.parse(reader.result);
                    if(json && json.data) {
                        json.data.forEach((item) => {
                            this.addSpendingsPosition(item.cat, item.amount, item.comment, new Date(item.day));
                        });
                    } 
                 };

                 reader.onerror = (err) => {
                    console.log('error while reading file: ' + err); // TODO Display error msg
                 };
                 reader.readAsText(files[i]);
             } else {
                console.log('Error: File is not a JSON document...');
                // TODO Display error msg
            }
        }
    }

    onClose() {
        this.setState({
            addFormIsVisible: false
        });
    }

    render() {

        let totalAmountSelectedDay = this.calculateTotalAmountAnyDay(this.state.selectedDay);
        return (
            <div id="spendings">
                {/*<h1 className="menu-item-headline">Spendings</h1>*/}
                <div className="box menu-actions">
                    <span className="menu-action"><button className="add-pos-btn" onClick={(e) => this.openAddModal(e)}>+</button> Add new spendings position</span>
                    <span className="menu-action"><button className="add-pos-btn" onClick={(e) => this.openImportModal(e)}>+</button> Import from JSON</span>
                </div>
                <div className="content">
                    <Calender
                        totalAmountDay={totalAmountSelectedDay}
                        totalAmountWeek={this.calculateTotalAmountWeek()}
                        totalAmountMonth={this.calculateTotalAmountMonth()}
                        totalAmountYear={this.calculateTotalAmountYear()}
                        selectedDay={this.state.selectedDay}
                        updateSelectedDay={this.updateSelectedDay}
                        calculateTotalAmountAnyDay={this.calculateTotalAmountAnyDay} />

                    <SpendingsDayOverview
                        totalAmountDay={totalAmountSelectedDay}
                        spendingsForDay={this.getSpendingPositionsForSelectedDay()}
                        selectedDay={this.state.selectedDay}/>

                    <AddForm 
                        isVisible={this.state.addFormIsVisible}
                        selectedDay={this.state.selectedDay}
                        addSpendingsPosition={this.addSpendingsPosition} 
                        onClose={this.onClose}/> 

                </div>
            </div>
        );
    }
}

export default Spendings;