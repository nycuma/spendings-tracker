import React from 'react';
import dateFnsFormat from 'date-fns/format';
import { Constants, Settings } from '../../utils/Constants';
import './Tiles.css';

class SpendingsSingleDay extends React.Component { // TODO Merge with SpendingsToday
    constructor(props) {
        super(props);
        this.state = {
            //spendingThisDay: 
            catExpandedView: this.initStateObject()
        };
    }

    componentWillReceiveProps(nextProps) {
        // When selected day changes, only categories are displayed, 
        // single spending positions are collapsed
        if (nextProps.spendingsForDay !== this.props.spendingsForDay) {
            this.setState({ catExpandedView: this.initStateObject() });
        }
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
            let amountSpent = this.calculateTotalAmountPerCategory(cat.value);
            let arrowClass = amountSpent > 0 ? (this.state.catExpandedView[cat.value] ? 'arrow-up' : 'arrow-down') : '';
            return (
                <tbody key={cat.value}>
                    <tr>
                        <td>{cat.label}</td>
                        <td className="cell-amount">{amountSpent.toLocaleString(Settings.LOCALE_CURRENCY, Constants.LOCALE_CURRENCY_OPTIONS)}</td>
                        <td className="arrow"><span className={arrowClass} onClick={() => this.toggleDisplayAllPositionsForCat(cat.value)}></span></td>
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
                    <tr key={cat+i} style={{display: displayExpanded}} className="font-small-colored">
                        <td>{item.comment}</td>
                        <td className="cell-amount">{item.amount.toLocaleString(Settings.LOCALE_CURRENCY, Constants.LOCALE_CURRENCY_OPTIONS)}</td>
                    </tr>
                );
            });
        }

    }

    render() {
        return( 
            <div className="tile">
                <h4>Spendings on {dateFnsFormat(this.props.selectedDay, Constants.DATE_FORMAT)}</h4>
                <table className="table-spendings">  
                    {this.renderTableBody()}    
                    <tfoot>
                        <tr>
                            <td><b>Total</b></td>
                            <td className="cell-amount"><b>{this.props.totalAmountDay.toLocaleString(Settings.LOCALE_CURRENCY, Constants.LOCALE_CURRENCY_OPTIONS)}</b></td>
                        </tr>
                    </tfoot>      
                </table>
            </div>
        ); 
    }
}

export default SpendingsSingleDay;