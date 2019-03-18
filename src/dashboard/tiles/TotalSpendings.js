import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Utils from '../../utils/Utils';
import './Tiles.scss';

const mapStateToProps = (state) => ({ 
    spendings: state.spendings,
    locale: state.settings.locale
});

/**
 * Shows total spendings of today, current week, month & year.
 */
function TotalSpendings(props) {
    let classes = props.fadeout ? 'tile fade-out' : 'tile';
    const today = new Date();
    const totalToday = Utils.calculateSumOfSpendings(Utils.filterSpendingsByDay(props.spendings, today));
    const totalWeek = Utils.calculateSumOfSpendings(Utils.filterSpendingsByWeek(props.spendings, today));
    const totalMonth = Utils.calculateSumOfSpendings(Utils.filterSpendingsByMonth(props.spendings, today));
    const totalYear = Utils.calculateSumOfSpendings(Utils.filterSpendingsByYear(props.spendings, today));
    return (
        <div className={classes}>
            <button className="close-tile" title="Close" onClick={() => props.toggleDisplay('totalSpendings')}>
                x
            </button>
            <h4>Total Spendings</h4>
            <table className="table-spendings">
                <tbody>
                    <tr>
                        <td>Today:</td>
                        <td className="cell-amount">{totalToday.toLocaleString(props.locale, props.currencyOptions)}</td>
                    </tr>
                    <tr>
                        <td>This week:</td>
                        <td className="cell-amount">{totalWeek.toLocaleString(props.locale, props.currencyOptions)}</td>
                    </tr>
                    <tr>
                        <td>This month:</td>
                        <td className="cell-amount">{totalMonth.toLocaleString(props.locale, props.currencyOptions)}</td>
                    </tr>
                    <tr>
                        <td>This year:</td>
                        <td className="cell-amount">{totalYear.toLocaleString(props.locale, props.currencyOptions)}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

TotalSpendings.propTypes = {
    locale: PropTypes.string.isRequired,
    currencyOptions: PropTypes.object.isRequired,
    toggleDisplay: PropTypes.func.isRequired,
    fadeout: PropTypes.bool.isRequired,
    spendings: PropTypes.arrayOf(PropTypes.object)
};

export default connect(mapStateToProps)(TotalSpendings);