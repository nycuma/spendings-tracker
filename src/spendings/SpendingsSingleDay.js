import React from 'react';
import { Constants, Settings } from '../utils/Constants';

class SpendingsSingleDay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            catExpandedView: this.initStateObject()
        };
    }

    initStateObject() {
        let stateExpandedView = {};
        Settings.SPENDING_CATEGORIES.forEach((cat) => {
            stateExpandedView[cat.value] = false;
        });
        return stateExpandedView;
    }
    
    calculateTotalAmountPerCategory(cat) {
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

    getSpendingsPositionByCat(cat) {
        if (this.props.spendingsForDay && this.props.spendingsForDay.length > 0) {
            return this.props.spendingsForDay.filter((item) => {
                return item.cat === cat;
            });
        }
    }

    toggleDisplayAllPositionsForCat(cat) {
        let updatedCatState = this.state.catExpandedView;
        updatedCatState[cat] = !this.state.catExpandedView[cat];
        this.setState({ catExpandedView: updatedCatState });
    }

    renderTableBody() {

        return Settings.SPENDING_CATEGORIES.map((cat) => {
            let amountSpent = this.calculateTotalAmountPerCategory(cat.value)
                                  .toLocaleString(Settings.LOCALE_CURRENCY, Constants.LOCALE_CURRENCY_OPTIONS);
            let arrowClass = this.state.catExpandedView[cat.value] ? 'arrow-up' : 'arrow-down';
            return (
                <tbody key={cat.value}>
                    <tr>
                        <td>{cat.label}</td>
                        <td >{amountSpent}</td>
                        <td><span className={arrowClass} onClick={() => this.toggleDisplayAllPositionsForCat(cat.value)}></span></td>
                    </tr>
                    {this.renderSpendingsPositons(cat.value)}
                </tbody>
            );
        });
    }

    renderSpendingsPositons(cat) {
        let spendingPositions = this.getSpendingsPositionByCat(cat);
        let displayExpanded = this.state.catExpandedView[cat] ? '' : 'none';

        if (spendingPositions) {
            return spendingPositions.map((item, i) => {
                return (
                    <tr key={cat+i} style={{display: displayExpanded}}>
                        <td>{item.comment}</td>
                        <td>{item.amount.toLocaleString(Settings.LOCALE_CURRENCY, Constants.LOCALE_CURRENCY_OPTIONS)}</td>
                    </tr>
                );
            });
        }

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
                {this.renderTableBody()}          
            </table>

        ); 
    }
}

export default SpendingsSingleDay;