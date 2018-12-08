import React from 'react';
import { LogIn } from 'react-feather';

function Header(props) {
    return (
        <header>
            <button id="login-btn">Login</button>
            <LogIn className="nav-icon nav-icon-top" /> 
        </header>
    );
}

export default Header;