import React from 'react';
import { Constants, Settings } from '../utils/Constants';

class SpendingsSingleDay extends React.Component {
    
    calculateTotalAmountPerCategory(cat) {
        //console.log('spendingsForDay: ' + JSON.stringify(this.props.spendingsForDay));
        if (this.props.spendingsForDay && this.props.spendingsForDay.length > 0) {
            return this.props.spendingsForDay.filter((item) => {
                return item.cat === cat;
            }).map((item) => {
                return item.amount;
            }).reduce((prevAmount, nextAmount) => {
                return prevAmount + nextAmount;
            }, 0);
        }

        return 0;  
    }

    renderTableBody() {

        return Settings.SPENDING_CATEGORIES.map((cat) => {
            let amountSpent = this.calculateTotalAmountPerCategory(cat.value).toLocaleString(Settings.LOCALE_CURRENCY, Constants.LOCALE_CURRENCY_OPTIONS);
            return (
                <tr key={cat.value}>
                    <td>{cat.value}</td>
                    <td >{amountSpent}</td>
                </tr>
            );
        });
    }

    render() {
         

        return( 
            <table id="tbl-spendings-single-day">
                <thead>
                    <tr>
                        <td>Category</td>
                        <td>Amount</td>
                    </tr>
                </thead>
                <tbody>
                    {this.renderTableBody()}
                </tbody>
            
            </table>

        ); 
    }
}

export default SpendingsSingleDay;