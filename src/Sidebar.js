import React from 'react';
import { Home, BarChart2, Settings } from 'react-feather';
import './style.css';

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayTitleDashboard: false,
            displayTitleAnalytics: false,
            displayTitleSettings: false
        };
    }

    toggleNavTitle(stateItem) {
        this.setState({ [stateItem]: !this.state[stateItem] });
    }

    render() {
        const activeMenuItem = this.props.activeMenuItem;
        const navItems = ['Dashboard', 'Analytics', 'Settings'];

        let navButtons = navItems.map((item, i) => {
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
                <ul>
                    <li className="nav-icon-with-title" 
                        onMouseEnter={() => this.toggleNavTitle('displayTitleDashboard')}
                        onMouseLeave={() => this.toggleNavTitle('displayTitleDashboard')}
                        onClick={(e) => this.props.onClick(e)} >
                        <Home 
                            width="27"
                            height="27"
                            className="nav-icon-side"
                        />
                        <span className={this.state.displayTitleDashboard ? '' : 'nav-title-hidden'}>Dashboard</span>
                    </li>
                    
                    <li className="nav-icon-with-title"
                        onMouseEnter={() => this.toggleNavTitle('displayTitleAnalytics')}
                        onMouseLeave={() => this.toggleNavTitle('displayTitleAnalytics')} 
                        onClick={(e) => this.props.onClick(e)} >
                        <BarChart2 
                            width="27"
                            height="27"
                            className="nav-icon-side"
                        />
                        <span className={this.state.displayTitleAnalytics ? '' : 'nav-title-hidden'}>Analytics</span>
                    </li>

                    <li className="nav-icon-with-title"
                        onMouseEnter={() => this.toggleNavTitle('displayTitleSettings')}
                        onMouseLeave={() => this.toggleNavTitle('displayTitleSettings')} 
                        onClick={(e) => this.props.onClick(e)} >
                        <Settings 
                            width="27"
                            height="27"
                            className="nav-icon-side"
                        />
                        <span className={this.state.displayTitleSettings ? '' : 'nav-title-hidden'}>Settings</span>
                    </li>
                </ul>
            </div>
        );
    }
}

export default Sidebar;
