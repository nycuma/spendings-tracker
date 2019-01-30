import React from 'react';
import { Constants, Settings } from '../../utils/Constants';
import Utils from '../../utils/Utils';
import { getSpendings } from '../../utils/LocalStore';
import './Tiles.css';

class SpendingsToday extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            catExpandedView: this.initStateObject()
        };
    }

    initStateObject() {
        let stateExpandedView = {};
        Settings.SPENDING_CATEGORIES.forEach((cat) => {
            stateExpandedView[cat.value] = true;
        });
        return stateExpandedView;
    }

    toggleDisplayAllPositionsForCat(cat) {
        let updatedCatState = this.state.catExpandedView;
        updatedCatState[cat] = !this.state.catExpandedView[cat];
        this.setState({ catExpandedView: updatedCatState });
    }

    renderTableBody(spendingsToday) {
        return Settings.SPENDING_CATEGORIES.map((cat) => {
            let amountSpent = Utils.calculateTotalAmountByCategory(spendingsToday, cat.value);
            let arrowClass = amountSpent > 0 ? (this.state.catExpandedView[cat.value] ? 'arrow-up' : 'arrow-down') : '';
            return (
                <tbody key={cat.value}>
                    <tr>
                        <td>{cat.label}</td>
                        <td className="cell-amount">{amountSpent.toLocaleString(Settings.LOCALE_CURRENCY, Constants.LOCALE_CURRENCY_OPTIONS)}</td>
                        <td className="arrow"><span className={arrowClass} onClick={() => this.toggleDisplayAllPositionsForCat(cat.value)}></span></td>
                    </tr>
                    {this.renderSpendingsPositons(spendingsToday, cat.value)}
                </tbody>
            );
        });
    }

    renderSpendingsPositons(spendingsToday, cat) {
        let spendingPositions = Utils.filterSpendingsByCategory(spendingsToday, cat);
        let displayExpanded = this.state.catExpandedView[cat] ? '' : 'none';

        if (spendingPositions) {
            return spendingPositions.map((item, i) => {
                return (
                    <tr key={cat+i} style={{display: displayExpanded}} className="font-small-colored">
                        <td>{item.comment}</td>
                        <td className="cell-amount">{item.amount.toLocaleString(Settings.LOCALE_CURRENCY, Constants.LOCALE_CURRENCY_OPTIONS)}</td>
                    </tr>
                );
            });
        }
    }

    render() {
        const spendingsToday = getSpendings(new Date());
        const totalToday = Utils.calculateSumOfSpendings(spendingsToday);

        return( 
            <div className="tile">
                <h4>Today's Spendings</h4>
                <table className="table-spendings">  
                    {this.renderTableBody(spendingsToday)}    
                    <tfoot>
                        <tr>
                            <td><b>Total</b></td>
                            <td className="cell-amount"><b>{totalToday.toLocaleString(Settings.LOCALE_CURRENCY, Constants.LOCALE_CURRENCY_OPTIONS)}</b></td>
                        </tr>
                    </tfoot>      
                </table>
            </div>
        ); 
    }
}

export default SpendingsToday;