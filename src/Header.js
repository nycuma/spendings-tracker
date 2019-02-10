import React from 'react';
import { Box } from 'react-feather';

function Header() {
    return (
        <header>   
            <button id="generate-btn" title="TODO">Generate random data</button>
            <Box className="nav-icon nav-icon-top" /> 
        </header>
    );
}

export default Header;