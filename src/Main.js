import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from './Header';
import Dashboard from './Dashboard';
import Analytics from './Analytics';
import Settings from './Settings';
import Sidebar from './Sidebar';
import { PreferenceProvider } from './utils/Contexts';
import { saveSpendings } from './utils/LocalStore';
import './style.scss';

const mapStateToProps = (state) => ({ spendings: state.spendings });

class Main extends Component {

    componentDidMount() {
        window.addEventListener('beforeunload', this.componentUnmount.bind(this));
    }

    componentWillUnmount() {
        this.componentUnmount();
        window.removeEventListener('beforeunload', this.componentUnmount.bind(this));
    }

    componentUnmount() {
        // save spendings from redux store to local storage
        saveSpendings(this.props.spendings, true);
    }

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

Main.propTypes = {
    spendings: PropTypes.arrayOf(PropTypes.object)
};

export default connect(mapStateToProps)(Main);

