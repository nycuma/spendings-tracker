import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import dateFnsFormat from 'date-fns/format';
import Utils from '../../utils/Utils';
import { Constants } from '../../utils/Constants';
import './Tiles.scss';

const mapStateToProps = (state) => ({ 
    spendings: state.spendings,
    categories: state.settings.categories,
    locale: state.settings.locale
});

class SpendingsSingleDay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
        this.props.categories.forEach((cat) => {
            stateExpandedView[cat.value] = this.props.onlyToday ? true : false;
        });
        return stateExpandedView;
    }

    toggleDisplayAllPositionsForCat(cat) {
        let updatedCatState = this.state.catExpandedView;
        updatedCatState[cat] = !this.state.catExpandedView[cat];
        this.setState({ catExpandedView: updatedCatState });
    }

    renderTableBody(spendingsDay) {
        return this.props.categories.map((cat) => {
            let amountSpent = Utils.calculateTotalAmountByCategory(spendingsDay, cat.value);
            let arrowClass = amountSpent > 0 ? (this.state.catExpandedView[cat.value] ? 'arrow-up' : 'arrow-down') : '';
            return (
                <tbody key={cat.value}>
                    <tr>
                        <td>{cat.label}</td>
                        <td className="cell-amount">{amountSpent.toLocaleString(this.props.locale, this.props.currencyOptions)}</td>
                        <td className="arrow"><span className={arrowClass} onClick={() => this.toggleDisplayAllPositionsForCat(cat.value)}></span></td>
                    </tr>
                    {this.renderSpendingsPositons(spendingsDay, cat.value)}
                </tbody>
            );
        });
    }

    renderSpendingsPositons(spendingsDay, cat) {
        let spendingPositions = Utils.filterSpendingsByCategory(spendingsDay, cat);
        let displayExpanded = this.state.catExpandedView[cat] ? '' : 'none';

        if (spendingPositions) {
            return spendingPositions.map((item, i) => {
                return (
                    <tr key={cat+i} style={{display: displayExpanded}} className="font-small-colored">
                        <td>{item.comment}</td>
                        <td className="cell-amount">{item.amount.toLocaleString(this.props.locale, this.props.currencyOptions)}</td>
                    </tr>
                );
            });
        }
    }
    
    render() {
        let classes = this.props.fadeout ? 'tile fade-out' : 'tile';
        const day = this.props.onlyToday ? new Date() : this.props.selectedDay;
        const spendingsForDay = Utils.filterSpendingsByDay(this.props.spendings, day);
        const total = Utils.calculateSumOfSpendings(spendingsForDay);
        const title = this.props.onlyToday ? 'Today\'s Spendings' : 'Spendings on ' + dateFnsFormat(this.props.selectedDay, Constants.DATE_FORMAT);
        return( 
            <div className={classes}>
                <button className="close-tile" title="Close" onClick={() => this.props.toggleDisplay('spendingsSingleDay')}>
                    x
                </button>
                <h4>{title}</h4>
                <table className="table-spendings">  
                    {this.renderTableBody(spendingsForDay)}    
                    <tfoot>
                        <tr>
                            <td><b>Total</b></td>
                            <td className="cell-amount"><b>{total.toLocaleString(this.props.locale, this.props.currencyOptions)}</b></td>
                        </tr>
                    </tfoot>      
                </table>
            </div>
        ); 
    }
}

SpendingsSingleDay.propTypes = {
    selectedDay: PropTypes.instanceOf(Date),
    locale: PropTypes.string.isRequired,
    currencyOptions: PropTypes.object.isRequired,
    totalAmountDay: PropTypes.number,
    spendingsForDay: PropTypes.arrayOf(PropTypes.object),
    categories: PropTypes.arrayOf(PropTypes.object).isRequired,
    toggleDisplay: PropTypes.func.isRequired,
    onlyToday: PropTypes.bool.isRequired,
    fadeout: PropTypes.bool.isRequired,
    spendings: PropTypes.arrayOf(PropTypes.object)
};

export default connect(mapStateToProps)(SpendingsSingleDay);