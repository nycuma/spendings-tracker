import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { subYears, startOfDay, startOfWeek, startOfMonth, startOfYear,
 endOfDay, endOfWeek, endOfMonth, endOfYear, eachDay } from 'date-fns';
import dateFnsFormat from 'date-fns/format';
import { Constants } from './utils/Constants';
import Utils from './utils/Utils';

const FORMAT_DAY = 'DD.MM.';
const FORMAT_WEEK = 'W';
const FORMAT_MONTH = 'MMM';
const FORMAT_YEAR = 'YYYY';

const mapStateToProps = (state) => ({ 
    spendings: state.spendings,
    categories: state.settings.categories
});

class Analytics extends Component {
    constructor(props) {
        super(props);
        const today = new Date();
        this.state = {
            unit: 'month',
            category: 'all',
            dateFrom: dateFnsFormat(subYears(today, 1), Constants.DATE_FORMAT_INPUT),
            dateTo: dateFnsFormat(today, Constants.DATE_FORMAT_INPUT),
            dataTotals: []
        };
    }

    componentDidMount() {
        this.updateChart();
    }

    handleUnit(e) {
        this.setState({ unit: e.target.value });
    }

    handleCategory(e) {
        this.setState({ category: e.target.value });
    }

    handleDate1(e) {
        this.setState({ dateFrom: e.target.value });
    }

    handleDate2(e) {
        this.setState({ dateTo: e.target.value });
    }

    updateChart() {
        let datesEach = [];
        let startOf, endOf, dateFormat;

        if(this.state.unit === 'day') {
            datesEach = eachDay(this.state.dateFrom, this.state.dateTo);
            startOf = startOfDay;
            endOf = endOfDay;
            dateFormat = FORMAT_DAY;
        }
        else if(this.state.unit === 'week') {
            datesEach = Utils.dateInEachWeek(this.state.dateFrom, this.state.dateTo);
            startOf = startOfWeek;
            endOf = endOfWeek;
            dateFormat = FORMAT_WEEK;
        }
        else if(this.state.unit === 'month') {
            datesEach = Utils.dateInEachMonth(this.state.dateFrom, this.state.dateTo);
            startOf = startOfMonth;
            endOf = endOfMonth;
            dateFormat = FORMAT_MONTH;
        }
        else if(this.state.unit === 'year') {
            datesEach = Utils.dateInEachYear(this.state.dateFrom, this.state.dateTo);
            startOf = startOfYear;
            endOf = endOfYear;
            dateFormat = FORMAT_YEAR;
        }

        let data = datesEach.map(date => {
            const cat = this.state.category === 'all' ? undefined : this.state.category;
            const spendingsBetween = Utils.getSpendingsBetween(this.props.spendings, startOf(date), endOf(date), cat);
            const total = Utils.calculateSumOfSpendings(spendingsBetween);
            return {
                name: dateFnsFormat(date, dateFormat),
                value: total
            };
        });
        
        this.setState({ dataTotals: data });
    }

    render() {
        const optionsCats = this.props.categories.map(cat => (<option key={cat.value} value={cat.value}>{cat.label}</option>));
        const optionsUnits = Constants.TIME_UNITS.map(unit => (<option key={unit} value={unit}>{unit}</option>));
        return (
            <div id="analytics" className="box">
                <h1 className="menu-item-headline">Analytics</h1>

                <div className="border-dashed scroll-x-axis">
                    <h4>Totals</h4>
                    <div className="setup">
                        <div>Unit:&nbsp;
                            <select value={this.state.unit} onChange={(e) => this.handleUnit(e)}>{optionsUnits}</select>
                        </div>
                        <div>
                            Time span:&nbsp;
                            <input type="date" value={this.state.dateFrom} onChange={(e) => this.handleDate1(e)}/>&nbsp;
                            <input type="date" value={this.state.dateTo} onChange={(e) => this.handleDate2(e)}/>
                        </div>
                        <div>Categories:&nbsp;
                            <select value={this.state.category} onChange={(e) => this.handleCategory(e)}>
                                <option value="all">All</option>
                                {optionsCats}     
                            </select>
                        </div>
                        <div>
                            <button onClick={() => this.updateChart()}>Update chart</button>
                        </div>
                    </div>
                    <div className="chart">
                        <BarChart width={1000} height={300} data={this.state.dataTotals} margin={{top: 30, right: 30, left: 20, bottom: 5}}>
                            <CartesianGrid strokeDasharray="3 3"/>
                            <XAxis dataKey="name"/>
                            <YAxis/>
                            <Bar dataKey="value" fill="#7E6258" />
                        </BarChart>
                    </div>
                </div>
                <div className="border-dashed">
                    <h4>Averages</h4>
                    TODO
                </div>
                <div className="border-dashed">
                    <h4>Comparisons</h4>
                    TODO
                </div>
            </div>
        );
    }
}

Analytics.propTypes = {
    categories: PropTypes.arrayOf(PropTypes.object),
    spendings: PropTypes.arrayOf(PropTypes.object)
};

export default connect(mapStateToProps)(Analytics);