import React from 'react';
import { Constants, Settings } from '../../utils/Constants';
import './Tiles.css';

function TotalSpendings(props) {

    return (
        <div className="tile">
            <h3>Total Spendings</h3>
            <table className="table-spendings">
                <tbody>
                        <tr>
                        <td>...this day:</td>
                        <td className="cell-amount">{props.totalAmountDay.toLocaleString(Settings.LOCALE_CURRENCY, Constants.LOCALE_CURRENCY_OPTIONS)}</td>
                    </tr>
                    <tr>
                        <td>...this week:</td>
                        <td className="cell-amount">{props.totalAmountWeek.toLocaleString(Settings.LOCALE_CURRENCY, Constants.LOCALE_CURRENCY_OPTIONS)}</td>
                    </tr>
                    <tr>
                        <td>...this month:</td>
                        <td className="cell-amount">{props.totalAmountMonth.toLocaleString(Settings.LOCALE_CURRENCY, Constants.LOCALE_CURRENCY_OPTIONS)}</td>
                    </tr>
                    <tr>
                        <td>...this year:</td>
                        <td className="cell-amount">{props.totalAmountYear.toLocaleString(Settings.LOCALE_CURRENCY, Constants.LOCALE_CURRENCY_OPTIONS)}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default TotalSpendings;