import React, { Component } from 'react';
import { Constants } from './utils/Constants';
import { PreferenceContext } from './utils/Contexts';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import subYears from 'date-fns/sub_years';
import dateFnsFormat from 'date-fns/format';

class Analytics extends Component {
    constructor(props) {
        super(props);
        const today = new Date();
        this.state = {
            valueUnit: 'month',
            valueCategory: 'all',
            valueDate1: dateFnsFormat(today, Constants.DATE_FORMAT_INPUT),
            valueDate2: dateFnsFormat(subYears(today, 1), Constants.DATE_FORMAT_INPUT)
        };
    }

    handleUnit(e) {
        this.setState({ valueUnit: e.target.value });
    }

    handleCategory(e) {
        this.setState({ valueCategory: e.target.value });
    }

    handleDate1(e) {
        this.setState({ valueDate1: e.target.value });
    }

    handleDate2(e) {
        this.setState({ valueDate2: e.target.value });
    }
    render() {
        const optionsUnits = Constants.TIME_UNITS.map(unit => (<option key={unit} value={unit}>{unit}</option>));
        const data = [
            {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
            {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
            {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
            {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
            {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
            {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
            {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
      ];
        return (
            <div id="analytics" className="box">
                <h1 className="menu-item-headline">Analytics</h1>

                <div className="border-dashed">
                    <h4>Totals</h4>
                    <div className="setup">
                        <div>Unit:&nbsp;
                            <select value={this.state.valueUnit} onChange={(e) => this.handleUnit(e)}>{optionsUnits}</select>
                        </div>
                        <div>
                            Time span:&nbsp;
                            <input type="date" value={this.state.valueDate1} onChange={(e) => this.handleDate1(e)}/>&nbsp;
                            <input type="date" value={this.state.valueDate2} onChange={(e) => this.handleDate2(e)}/>
                        </div>
                        <div>Categories:&nbsp;
                            <select value={this.state.valueCategory} onChange={(e) => this.handleCategory(e)}>
                                <option value="all">All</option>
                                <PreferenceContext.Consumer>
                                    {({categories}) => {
                                        const optionsCats = categories.map((cat) => 
                                                <option key={cat.value} value={cat.value}>{cat.label}</option>);
                                        return (optionsCats);
                                    }}
                                </PreferenceContext.Consumer>
                            </select>
                        </div>
                    </div>
                    <div className="chart">
                        <BarChart width={600} height={300} data={data} margin={{top: 30, right: 30, left: 20, bottom: 5}}>
                            <CartesianGrid strokeDasharray="3 3"/>
                            <XAxis dataKey="name"/>
                            <YAxis/>
                            <Legend/>
                            <Bar dataKey="uv" fill="#82ca9d" />
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

export default Analytics;