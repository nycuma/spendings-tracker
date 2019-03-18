import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import dateFnsFormat from 'date-fns/format';
import { Constants } from '../../utils/Constants';
import './Tiles.scss';

const mapStateToProps = (state) => ({ 
    spendings: state.spendings,
    locale: state.settings.locale
});

function RecentHistory(props) {
    const entries = props.spendings.slice(-15).reverse().map((pos, i) => {
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

    let classes = props.fadeout ? 'tile fade-out' : 'tile';
    return (
        <div className={classes}>
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
    spendings: PropTypes.arrayOf(PropTypes.object),
    toggleDisplay: PropTypes.func.isRequired,
    fadeout: PropTypes.bool.isRequired
};

export default connect(mapStateToProps)(RecentHistory);