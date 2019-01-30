import React from 'react';
import dateFnsFormat from 'date-fns/format';
import { Constants, Settings } from '../../utils/Constants';
import { getRecurrentSpendings } from '../../utils/LocalStore';
import './Tiles.css';

function RecurrentSpendings() {
    const recurrentSp = getRecurrentSpendings();
    const entries = recurrentSp.map((rs, i) => {
        return (
            <tr key={i}> 
                <td className="align-left">{dateFnsFormat(rs.startDate, Constants.DATE_FORMAT_SHORT)}</td>
                <td>{rs.interval}</td>
                <td>{rs.comment.length < 28 ? rs.comment : rs.comment.substring(0, 25) + '...'}</td>
                <td className="font-small-colored align-right">
                    {rs.amount.toLocaleString(Settings.LOCALE_CURRENCY, Constants.LOCALE_CURRENCY_OPTIONS)}
                </td>
            </tr>
        );
    });

    const tbleHead = entries.length > 0 ? 
                        (<tr>
                            <td> Since </td>
                            <td> Interval </td>
                            <td> Description </td>
                            <td> Amount </td>
                        </tr>) 
                        : 'No recurrent spendings found';

    return (
        <div className="tile">
            <h4>Recurrent Spendings</h4>
            <table className="table-spendings-history">
                <thead>
                    {tbleHead}
                </thead>
                <tbody>
                    {entries}
                </tbody>
            </table>
        </div>
    );
}

export default RecurrentSpendings;