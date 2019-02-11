import React from 'react';
import PropTypes from 'prop-types';
import { Constants } from '../utils/Constants';
import './TotalAmountDay.css';
import { PreferenceContext } from '../utils/Contexts';

/**
 * Displays amount spent on a day when hovering over specific day
 * in the DayPicker
 */
function TotalAmountDay(props)  {
    return (
        <PreferenceContext.Consumer>
            {({ currency, locale }) => (
                <div className="hover-total-amount-day" style={props.position}>
                    {props.totalAmountDay.toLocaleString(locale, { ...Constants.DEFAULT_CURRENCY_OPTIONS, ...{ currency: currency }})}
                </div>
            )}
        </PreferenceContext.Consumer>
    ); 
}

TotalAmountDay.propTypes = {
    position: PropTypes.object,
    totalAmountDay: PropTypes.number
};

export default TotalAmountDay;