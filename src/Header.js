import React from 'react';
import { Box } from 'react-feather';
import subMonths from 'date-fns/sub_months';
import Utils from './utils/Utils';

function Header() {
    const today = new Date();
    const someTimeAgo = subMonths(today, 3);

    return (
        <header>   
            <div className="wrapper-generate-btn">
                <button id="generate-btn" onClick={() => Utils.generateRandomData(150, someTimeAgo, today)}>Generate random data</button>
                <span className="btn-sub-title">Requires page reload (TODO)</span>
            </div>
            <Box className="nav-icon nav-icon" /> 
        </header>
    );
}

export default Header;