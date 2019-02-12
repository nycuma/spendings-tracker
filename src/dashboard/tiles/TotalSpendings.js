import React from 'react';
import PropTypes from 'prop-types';
import './Tiles.css';

/**
 * Shows total spendings of today, current week, month & year.
 */
function TotalSpendings(props) {

    return (
        <div className="tile">
            <button className="close-tile" title="Close" onClick={() => props.toggleDisplay('totalSpendings')}>
                x
            </button>
            <h4>Total Spendings</h4>
            <table className="table-spendings">
                <tbody>
                    <tr>
                        <td>Today:</td>
                        <td className="cell-amount">{props.totalAmountToday.toLocaleString(props.locale, props.currencyOptions)}</td>
                    </tr>
                    <tr>
                        <td>This week:</td>
                        <td className="cell-amount">{props.totalAmountWeek.toLocaleString(props.locale, props.currencyOptions)}</td>
                    </tr>
                    <tr>
                        <td>This month:</td>
                        <td className="cell-amount">{props.totalAmountMonth.toLocaleString(props.locale, props.currencyOptions)}</td>
                    </tr>
                    <tr>
                        <td>This year:</td>
                        <td className="cell-amount">{props.totalAmountYear.toLocaleString(props.locale, props.currencyOptions)}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

TotalSpendings.propTypes = {
    locale: PropTypes.string.isRequired,
    currencyOptions: PropTypes.object.isRequired,
    totalAmountToday: PropTypes.number,
    totalAmountWeek: PropTypes.number,
    totalAmountMonth: PropTypes.number,
    totalAmountYear: PropTypes.number,
    toggleDisplay: PropTypes.func.isRequired
};

export default TotalSpendings;