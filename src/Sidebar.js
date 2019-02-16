import React from 'react';
import { Link } from 'react-router-dom';
import { Home, BarChart2, Settings } from 'react-feather';
import './style.scss';

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
        return(
            <div id="sidebar" style={{top: this.state.distanceTop}}>
                <ul>
                    <li onMouseEnter={() => this.toggleNavTitle('displayTitleDashboard')}
                        onMouseLeave={() => this.toggleNavTitle('displayTitleDashboard')} >
                        <Link to='/dashboard'>
                            <Home 
                                width="27"
                                height="27"
                                className="nav-icon-side"
                            />
                            <span className={this.state.displayTitleDashboard ? '' : 'hidden'}>Dashboard</span>               
                        </Link>   
                    </li> 

                    
                    <li onMouseEnter={() => this.toggleNavTitle('displayTitleAnalytics')}
                        onMouseLeave={() => this.toggleNavTitle('displayTitleAnalytics')} >
                        <Link to='/analytics'>
                            <BarChart2 
                                width="27"
                                height="27"
                                className="nav-icon-side"
                            />
                            <span className={this.state.displayTitleAnalytics ? '' : 'hidden'}>Analytics</span>
                        </Link>
                    </li>

                    <li onMouseEnter={() => this.toggleNavTitle('displayTitleSettings')}
                        onMouseLeave={() => this.toggleNavTitle('displayTitleSettings')} >
                        <Link to='/settings'>
                            <Settings 
                                width="27"
                                height="27"
                                className="nav-icon-side"
                            />
                            <span className={this.state.displayTitleSettings ? '' : 'hidden'}>Settings</span>
                        </Link>
                    </li>
                </ul>
            </div>
        );
    }
}

export default Sidebar;
