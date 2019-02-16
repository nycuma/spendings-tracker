import React from 'react';
import { Box } from 'react-feather';
import subMonths from 'date-fns/sub_months';
import Utils from './utils/Utils';

function Header() {
    const today = new Date();
    const someTimeAgo = subMonths(today, 3);

    return (
        <header>   
            <button id="generate-btn" title="Requires restart (TODO)" onClick={() => Utils.generateRandomData(150, someTimeAgo, today)}>Generate random data</button>
            <Box className="nav-icon nav-icon" /> 
        </header>
    );
}

export default Header;