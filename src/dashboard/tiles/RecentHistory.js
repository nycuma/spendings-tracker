import React from 'react';
import dateFnsFormat from 'date-fns/format';
import { Constants, Settings } from '../../utils/Constants';
import './Tiles.css';

function RecentHistory(props) {
    const entries = props.recentSpendings.map(pos => {
        return (
            <tr>
                <td> {pos.dateAdded}:</td>
                <td> {pos.comment} </td>
                <td className="table-row-single-spendings-pos">
                    ({pos.amount.toLocaleString(Settings.LOCALE_CURRENCY, Constants.LOCALE_CURRENCY_OPTIONS)} 
                        spent on {dateFnsFormat(pos.day, Constants.DATE_FORMAT)})
                </td>
            </tr>
        );
    });

    return (
        <div className="tile">
            <h4>Spendings History2</h4>
            <table className="table-spendings-history">
                <tbody>
                    {entries}
                </tbody>
            </table>
        </div>
    );
}

export default RecentHistory;