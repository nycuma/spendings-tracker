import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from './Header';
import Dashboard from './Dashboard';
import Analytics from './Analytics';
import Settings from './Settings';
import Sidebar from './Sidebar';
import { saveSpendings, saveCurrency, saveLocale, saveCategories } from './utils/LocalStore';
import './style.scss';

const mapStateToProps = (state) => ({ 
    spendings: state.spendings,
    currency: state.settings.currency,
    locale: state.settings.locale,
    categories: state.settings.categories  
});

class Main extends Component {

    componentDidMount() {
        window.addEventListener('beforeunload', this.componentUnmount.bind(this));
    }

    componentWillUnmount() {
        this.componentUnmount();
        window.removeEventListener('beforeunload', this.componentUnmount.bind(this));
    }

    componentUnmount() {
        // save spendings from redux store to local storage when closing or reloading the page
        saveSpendings(this.props.spendings, true);
        saveCurrency(this.props.currency);
        saveLocale(this.props.locale);
        saveCategories(this.props.categories);
    }

    render() {
        return (
        <div id="main-container"> 
            <Header />
            <nav className="box">
                <Sidebar />
            </nav>
            <Switch>
                <Route exact path="/" component={Dashboard}/>
                <Route path="/dashboard" component={Dashboard}/>
                <Route path="/analytics" component={Analytics}/>
                <Route path="/settings" component={Settings}/>
            </Switch>
        </div>
        );
    }
}

Main.propTypes = {
    spendings: PropTypes.arrayOf(PropTypes.object),
    currency: PropTypes.string.isRequired,
    locale: PropTypes.string.isRequired,
    categories: PropTypes.arrayOf(PropTypes.object),
};

export default connect(mapStateToProps)(Main);

