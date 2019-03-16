import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Box } from 'react-feather';
import subMonths from 'date-fns/sub_months';
import Utils from './utils/Utils';
import { addSpendings } from './utils/ReduxStore';

const mapDispatchToProps = dispatch => ({ 
    addSpendings: spendings => dispatch(addSpendings(spendings))
});

function Header(props) {
    const today = new Date();
    const someTimeAgo = subMonths(today, 3);
    const randomSpendings = Utils.generateRandomData(150, someTimeAgo, today);

    return (
        <header>   
            <div className="wrapper-generate-btn">
                <button id="generate-btn" onClick={() => props.addSpendings(randomSpendings)}>Generate random data</button>
            </div>
            <Box className="nav-icon nav-icon" /> 
        </header>
    );
}

Header.propTypes = {
    addSpendings: PropTypes.func.isRequired
};

export default connect(null, mapDispatchToProps)(Header);