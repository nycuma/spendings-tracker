import React from 'react';
import PropTypes from 'prop-types';
import dateFnsFormat from 'date-fns/format';
import { Constants } from '../../utils/Constants';
import './Tiles.scss';

function RecentHistory(props) {
    const entries = props.recentSpendings.map((pos, i) => {
        return (
            <tr key={i}> 
                <td className="align-left">{dateFnsFormat(pos.day, Constants.DATE_FORMAT_SHORT)}</td>
                <td>{pos.comment.length < 28 ? pos.comment : pos.comment.substring(0, 25) + '...'}</td>
                <td className="font-small-colored align-right">
                    {pos.amount.toLocaleString(props.locale, props.currencyOptions)}
                </td>
            </tr>
        );
    });

    return (
        <div className="tile">
            <button className="close-tile" title="Close" onClick={() => props.toggleDisplay('recentHistory')}>
                x
            </button>
            <h4>Recently Added Spendings</h4>
            <table className="table-spendings-history">
                <tbody>
                    {entries}
                </tbody>
            </table>
        </div>
    );
}

RecentHistory.propTypes = {
    locale: PropTypes.string.isRequired,
    currencyOptions: PropTypes.object.isRequired,
    recentSpendings: PropTypes.arrayOf(PropTypes.object),
    toggleDisplay: PropTypes.func.isRequired
};

export default RecentHistory;