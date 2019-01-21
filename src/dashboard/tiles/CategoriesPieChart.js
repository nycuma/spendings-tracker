import React from 'react';
import { PieChart, Pie, Legend, Cell } from 'recharts';
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
        const randomData = [35,20,30,15,10,5,5]; // TODO get data
        const pieColors = [];
        const chartData = Settings.SPENDING_CATEGORIES.map((cat, i) => {
            pieColors.push(cat.color);
            return { name: cat.label, value: randomData[i] };
        });
        
        return (
            <div className="tile">
                <h4>Spendings on Categories</h4>
                <PieChart width={450} height={150}>
                    <Pie isAnimationActive={true} data={chartData} outerRadius={40} fill="#58747E" 
                        labelLine={true} label dataKey="value" nameKey="name">
                        {
          	                chartData.map((entry, i) => <Cell fill={pieColors[i]}/>)
                        }
                     </Pie>   
                    <Legend layout="vertical" align="right" width="100" iconType="square" iconSize="12"/>
                </PieChart>  
            </div>
        );
    }
}

export default CategoriesPieChart;