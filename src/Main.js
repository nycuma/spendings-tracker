import React, { Component } from 'react';
import Menu from './Menu';
import Spendings from './Spendings';
import Statistics from './Statistics';
import Settings from './Settings';
import Login from './Login';
import './style.css';

class Main extends Component {
    constructor(props) {
        super(props);
        this.switchMenuItem = this.switchMenuItem.bind(this);
        this.state = {
            activeMenuItem: 'Spendings'
        };
    }

    switchMenuItem(evt) {
        this.setState({ activeMenuItem : evt.target.innerHTML });
    }

    render() {
        
        let menuItem;
        switch(this.state.activeMenuItem) {
            case 'Spendings' : menuItem = <Spendings />; break;
            case 'Statistics' : menuItem = <Statistics />; break;
            case 'Settings' : menuItem = <Settings />; break;
            case 'Login' : menuItem = <Login />; break;
            default : menuItem = <Spendings />; break;
        }

        return (
            <div id="main-container">
                <Menu 
                    activeMenuItem={this.state.activeMenuItem} 
                    onClick={(evt) => this.switchMenuItem(evt)}
                />
                {menuItem}
            </div>
        );
    }
}

export default Main;

