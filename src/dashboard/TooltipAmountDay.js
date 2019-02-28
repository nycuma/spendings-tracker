import React from 'react';
import PropTypes from 'prop-types';
import { Constants } from '../utils/Constants';
import './TooltipAmountDay.scss';
import { PreferenceConsumer } from '../utils/Contexts';

/**
 * Displays amount spent on a day when hovering over specific day
 * in the DayPicker
 */
function TooltipAmountDay(props)  {
    return (
        <PreferenceConsumer>
        {({ currency, locale }) => (
            <div className="hover-total-amount-day" style={props.style}>
                {props.amount.toLocaleString(locale, { ...Constants.DEFAULT_CURRENCY_OPTIONS, ...{ currency: currency }})}
            </div>
        )}
        </PreferenceConsumer>
    ); 
}

TooltipAmountDay.propTypes = {
    style: PropTypes.object.isRequired,
    amount: PropTypes.number.isRequired
};

export default TooltipAmountDay;