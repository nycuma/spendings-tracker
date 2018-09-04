import React from 'react';


class Menu extends React.Component {

    render() {

        const activeMenuItem = this.props.activeMenuItem;
        const menuItems = ['Spendings', 'Statistics', 'Settings', 'Login'];

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
    
        return (
            <div className="header-box">
                    {menuButtons}
                </div>
        );
    }
}

export default Menu;