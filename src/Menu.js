import React from 'react';


class Menu extends React.Component {


    //tem
    render() {

        const activeMenuItem = this.props.activeMenuItem;
    // TODO highlight active menu i
    
        return (
            <div className="header-box">
                    <button id="spendings-btn" className="active-item">Spendings</button>
                    <button id="statistics-btn">Statistics</button>
                    <button id="settings-btn">Settings</button>
                    <button id="login-btn">Login</button>
                </div>
        );
    }

}

export default Menu;