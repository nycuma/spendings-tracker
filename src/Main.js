import React, { Component } from 'react';
import Header from './Header';
import Dashboard from './Dashboard';
import Analytics from './Analytics';
import Settings from './Settings';
import Sidebar from './Sidebar';
import './style.css';

class Main extends Component {
    constructor(props) {
        super(props);
        this.switchMenuItem = this.switchMenuItem.bind(this);
        this.state = {
            activeMenuItem: 'Dashboard'
        };
    }

    switchMenuItem(evt) {
        console.log('switch menu item: ' + JSON.stringify(evt.target.value));
        //this.setState({ activeMenuItem : evt.target.innerHTML });
    }

    render() {
        
        let menuItem;
        switch(this.state.activeMenuItem) {
            case 'Dashboard' : menuItem = <Dashboard />; break;
            case 'Analytics' : menuItem = <Analytics />; break;
            case 'Settings' : menuItem = <Settings />; break;
            //case 'Login' : menuItem = <Login />; break;
            default : menuItem = <Dashboard />; break;
        }

        return (
            <div id="main-container">
                
                <Header />

                <nav className="box">
                    <Sidebar 
                        activeMenuItem={this.state.activeMenuItem} 
                        onClick={(e) => this.switchMenuItem(e)}
                    />
                </nav> 
                {menuItem}
                 
            </div>
        );
    }
}

export default Main;

