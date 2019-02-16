import React from 'react';
import uuidv4 from 'uuid/v4';
import Calender from './dashboard/Calender';
import AddForm from './dashboard/AddForm';
import Tiles from './dashboard/Tiles';
import Utils from './utils/Utils';
import * as localStore from './utils/LocalStore';
import { PreferenceContext } from './utils/Contexts';
import './dashboard/Dashboard.scss';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.updateSelectedDay = this.updateSelectedDay.bind(this);
        this.addSpendingsPosition = this.addSpendingsPosition.bind(this);
        this.handleFileUpload = this.handleFileUpload.bind(this);
        this.onClose = this.onClose.bind(this);
        this.openAddModal = this.openAddModal.bind(this);
        this.openImportModal = this.openImportModal.bind(this);
        this.state = {
            selectedDay: new Date(),
            recentSpendings: [],
            addFormIsVisible: false
        };
    }

    componentDidMount() {
        this.fileSelector = this.initFileSelector();
        this.setState({
            // load recent spendings
            recentSpendings: localStore.getSpendingsRecentlyAdded(15)
        });
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
        const date = day ? new Date(day) : this.state.selectedDay;
        const newSpending = {
            id: uuidv4(),
            day: date,
            cat: cat,
            amount: amount,
            comment: comment
        };

        this.setState({
            recentSpendings: [newSpending].concat(this.state.recentSpendings)
        });
        localStore.postSpendingPosition(newSpending);
    }

    getTotalAmountDay(date) {
        let spendings = localStore.getSpendings(date ? date : this.state.selectedDay);
        return Utils.calculateSumOfSpendings(spendings);
    }

    getTotalAmountWeek(date) {
        let spendings = localStore.getSpendings(date ? date : this.state.selectedDay, true);
        return Utils.calculateSumOfSpendings(spendings);
    }

    getTotalAmountMonth(date) {
        let spendings = localStore.getSpendings(date ? date : this.state.selectedDay, false, true);
        return Utils.calculateSumOfSpendings(spendings);
    }

    getTotalAmountYear(date) {
        let spendings = localStore.getSpendings(date ? date : this.state.selectedDay, false, false, true);
        return Utils.calculateSumOfSpendings(spendings);
    }

    getSpendingsForSelectedDay() {
        return localStore.getSpendings(this.state.selectedDay);
    }

    /** TODO still needed?
     * Returns an array that contains the total amount of
     * money spent on each day for an entire month.
     * Position i contains amount for (i+1)th day of the month.
     * 
     * @param {Number} month (Jan=0, Dec=11)
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
        return (
            <div id="dashboard" className="box">
                    <Tiles 
                        totalAmountToday={this.getTotalAmountDay(new Date())}
                        totalAmountDay={this.getTotalAmountDay()}
                        totalAmountWeek={this.getTotalAmountWeek(new Date())}
                        totalAmountMonth={this.getTotalAmountMonth(new Date())}
                        totalAmountYear={this.getTotalAmountYear(new Date())}

                        selectedDay={this.state.selectedDay}
                        spendingsForDay={this.getSpendingsForSelectedDay()}
                        recentSpendings={this.state.recentSpendings}
                    />

                    <Calender
                        selectedDay={this.state.selectedDay}
                        updateSelectedDay={this.updateSelectedDay}
                        openAddModal={this.openAddModal}  
                        openImportModal={this.openImportModal}  
                    />

                    {this.state.addFormIsVisible &&
                        <PreferenceContext.Consumer>
                            {({locale, categories}) => (
                                <AddForm 
                                    selectedDay={this.state.selectedDay}
                                    addSpendingsPosition={this.addSpendingsPosition} 
                                    onClose={this.onClose}
                                    locale={locale}
                                    categories={categories}
                                /> 
                            )}
                        </PreferenceContext.Consumer>
                        
                    }
                
            </div>
        );
    }
}
Dashboard.contextType = PreferenceContext; // TODO this.context not working..

export default Dashboard;