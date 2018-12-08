import React from 'react';
import { Box, BarChart2, Settings } from 'react-feather';

function Sidebar(props) {
    const activeMenuItem = props.activeMenuItem;
    const menuItems = ['Spendings', 'Analytics', 'Settings', 'Login'];

    let menuButtons = menuItems.map((item, i) => {
        let classes = '';
        // highlight currently selected menu item
        if(item === activeMenuItem) classes = 'active-item'; 
        return (
            <button 
                key={item.toLowerCase + '-btn-' + i} 
                id={item.toLowerCase + '-btn'} 
                className={classes} 
                onClick={(e) => this.props.onClick(e)}>
                    {item}
            </button>
        );
    });

    return(
        <div id="sidebar">
            <Box 
                className="nav-icon nav-icon-side"
                value="Dashboard"
                onClick={(e) => props.onClick(e)}
            />
            <BarChart2 
                className="nav-icon nav-icon-side"
                value="Analytics"
                onClick={(e) => props.onClick(e)}
            />
            <Settings 
                className="nav-icon nav-icon-side"
                value="Settings"
                onClick={(e) => props.onClick(e)}
            />
        </div>
    );
}

export default Sidebar;
