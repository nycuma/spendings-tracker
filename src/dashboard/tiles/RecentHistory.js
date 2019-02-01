import React from 'react';
import dateFnsFormat from 'date-fns/format';
import { Constants, prefs } from '../../utils/Constants';
import './Tiles.css';

function RecentHistory(props) {
    const entries = props.recentSpendings.map((pos, i) => {
        return (
            <tr key={i}> 
                <td className="align-left">{dateFnsFormat(pos.day, Constants.DATE_FORMAT_SHORT)}</td>
                <td>{pos.comment.length < 28 ? pos.comment : pos.comment.substring(0, 25) + '...'}</td>
                <td className="font-small-colored align-right">
                    {pos.amount.toLocaleString(prefs.locale, prefs.currencyOptions)}
                </td>
            </tr>
        );
    });

    return (
        <div className="tile">
            <h4>Recent Spendings</h4>
            <table className="table-spendings-history">
                <tbody>
                    {entries}
                </tbody>
            </table>
        </div>
    );
}

export default RecentHistory;