import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Constants } from '../utils/Constants';
import './TooltipAmountDay.scss';

const mapStateToProps = (state) => ({ 
    currency: state.settings.currency,
    locale: state.settings.locale 
});

/**
 * Displays amount spent on a day when hovering over specific day
 * in the DayPicker
 */
function TooltipAmountDay(props)  {
    return (
        <div className="hover-total-amount-day" style={props.style}>
            {props.amount.toLocaleString(props.locale, { ...Constants.DEFAULT_CURRENCY_OPTIONS, ...{ currency: props.currency }})}
        </div>
    ); 
}

TooltipAmountDay.propTypes = {
    style: PropTypes.object.isRequired,
    amount: PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired,
    locale: PropTypes.string.isRequired
};

export default connect(mapStateToProps)(TooltipAmountDay);