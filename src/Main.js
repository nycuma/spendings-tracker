import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './Header';
import Dashboard from './Dashboard';
import Analytics from './Analytics';
import Settings from './Settings';
import Sidebar from './Sidebar';
import { PreferenceProvider } from './utils/Contexts';
import './style.scss';

class Main extends Component {

    render() {
        return (
        <div id="main-container"> 
            <Header />
            <nav className="box">
                <Sidebar />
            </nav>
            <PreferenceProvider>
                <Switch>
                    <Route exact path="/" component={Dashboard}/>
                    <Route path="/dashboard" component={Dashboard}/>
                    <Route path="/analytics" component={Analytics}/>
                    <Route path="/settings" component={Settings}/>
                </Switch>
            </PreferenceProvider>
        </div>
        );
    }
    
}

export default Main;

