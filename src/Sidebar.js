import React from 'react';
import { Home, BarChart2, Settings } from 'react-feather';
import './style.css';

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayTitleDashboard: false,
            displayTitleAnalytics: false,
            displayTitleSettings: false,
            distanceTop: 55
        };
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleSidebarPosition.bind(this));
    }

    handleSidebarPosition() {
        let scrollTop = (document.documentElement.scrollTop || document.body.scrollTop);
        this.setState({ distanceTop: Math.max(55 - scrollTop, 0) });
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
            <div id="sidebar" style={{top: this.state.distanceTop}}>
                <ul>
                    <li onMouseEnter={() => this.toggleNavTitle('displayTitleDashboard')}
                        onMouseLeave={() => this.toggleNavTitle('displayTitleDashboard')}
                        onClick={(e) => this.props.onClick(e)} >
                        <Home 
                            width="27"
                            height="27"
                            className="nav-icon-side"
                        />
                        <span className={this.state.displayTitleDashboard ? '' : 'hidden'}>Dashboard</span>
                    </li>
                    
                    <li onMouseEnter={() => this.toggleNavTitle('displayTitleAnalytics')}
                        onMouseLeave={() => this.toggleNavTitle('displayTitleAnalytics')} 
                        onClick={(e) => this.props.onClick(e)} >
                        <BarChart2 
                            width="27"
                            height="27"
                            className="nav-icon-side"
                        />
                        <span className={this.state.displayTitleAnalytics ? '' : 'hidden'}>Analytics</span>
                    </li>

                    <li onMouseEnter={() => this.toggleNavTitle('displayTitleSettings')}
                        onMouseLeave={() => this.toggleNavTitle('displayTitleSettings')} 
                        onClick={(e) => this.props.onClick(e)} >
                        <Settings 
                            width="27"
                            height="27"
                            className="nav-icon-side"
                        />
                        <span className={this.state.displayTitleSettings ? '' : 'hidden'}>Settings</span>
                    </li>
                </ul>
            </div>
        );
    }
}

export default Sidebar;
