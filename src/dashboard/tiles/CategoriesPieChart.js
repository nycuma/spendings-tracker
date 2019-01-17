import React from 'react';
import { PieChart, Pie, Legend, Tooltip } from 'recharts';
import { Settings } from '../../utils/Constants';
import './Tiles.css';

class CategoriesPieChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            unit: 'week'
        };
    }

    render() {

        const chartData = Settings.SPENDING_CATEGORIES.map((cat) => {
            // TODO
        });

        const chartLegend = Settings.SPENDING_CATEGORIES.map((cat) => {
            // TODO
        });
        const data01 = [{name: 'Group A', value: 400}, {name: 'Group B', value: 300},
                        {name: 'Group C', value: 300}, {name: 'Group D', value: 200},
                        {name: 'Group E', value: 278}, {name: 'Group F', value: 189}];
        
        return (
            <div className="tile">
                <h4>Spendings on Categories</h4>

                <PieChart width={200} height={170}>
                    <Pie isAnimationActive={false} data={data01} outerRadius={40} fill="#58747E" label/>
                    <Tooltip/>
                </PieChart>  
            </div>
        );
    }
}

export default CategoriesPieChart;