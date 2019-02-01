import React from 'react';
import { prefs } from '../../utils/Constants';
import './Tiles.css';

/**
 * Shows total spendings of today, current week, month & year.
 */
function TotalSpendings(props) {

    return (
        <div className="tile">
            <h4>Total Spendings</h4>
            <table className="table-spendings">
                <tbody>
                    <tr>
                        <td>Today:</td>
                        <td className="cell-amount">{props.totalAmountToday.toLocaleString(prefs.locale, prefs.currencyOptions)}</td>
                    </tr>
                    <tr>
                        <td>This week:</td>
                        <td className="cell-amount">{props.totalAmountWeek.toLocaleString(prefs.locale, prefs.currencyOptions)}</td>
                    </tr>
                    <tr>
                        <td>This month:</td>
                        <td className="cell-amount">{props.totalAmountMonth.toLocaleString(prefs.locale, prefs.currencyOptions)}</td>
                    </tr>
                    <tr>
                        <td>This year:</td>
                        <td className="cell-amount">{props.totalAmountYear.toLocaleString(prefs.locale, prefs.currencyOptions)}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default TotalSpendings;