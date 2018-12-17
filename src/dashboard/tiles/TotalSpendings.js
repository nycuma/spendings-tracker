import React from 'react';
import { Constants, Settings } from '../../utils/Constants';
import './Tiles.css';

function TotalSpendings(props) {

    return (
        <div className="tile">
            <h4>Total Spendings</h4>
            <table className="table-spendings">
                <tbody>
                    <tr>
                        <td>This day:</td>
                        <td className="cell-amount">{props.totalAmountDay.toLocaleString(Settings.LOCALE_CURRENCY, Constants.LOCALE_CURRENCY_OPTIONS)}</td>
                    </tr>
                    <tr>
                        <td>This week:</td>
                        <td className="cell-amount">{props.totalAmountWeek.toLocaleString(Settings.LOCALE_CURRENCY, Constants.LOCALE_CURRENCY_OPTIONS)}</td>
                    </tr>
                    <tr>
                        <td>This month:</td>
                        <td className="cell-amount">{props.totalAmountMonth.toLocaleString(Settings.LOCALE_CURRENCY, Constants.LOCALE_CURRENCY_OPTIONS)}</td>
                    </tr>
                    <tr>
                        <td>This year:</td>
                        <td className="cell-amount">{props.totalAmountYear.toLocaleString(Settings.LOCALE_CURRENCY, Constants.LOCALE_CURRENCY_OPTIONS)}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default TotalSpendings;