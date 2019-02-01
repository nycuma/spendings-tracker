import React from 'react';
import { PieChart, Pie, Legend, Cell } from 'recharts';
import { prefs } from '../../utils/Constants';
import { getAmountSpentByCategory } from '../../utils/LocalStore';
import './Tiles.css';

function CategoriesPieChart() {
    const data = getAmountSpentByCategory();
    let pieColors = [];
    let chartData;

    if(!data || data.length === 0) {
        pieColors.push('#f1f4f4');
        chartData = [{
            name: 'No data available',
            value: 1
        }];
    } else {
        chartData = prefs.spendingCats.map((cat, i) => {
        pieColors.push(cat.color);
        return { 
            name: cat.label.length <= 20 ? cat.label : cat.label.substring(0, 18) + '...',
            value: data[i].amount };
        });
    }
    
    return (
        <div className="tile">
            <h4>Spendings on Categories</h4>
            <div id="piechart"> {/* TODO: Animation and labal line not working */}
                <PieChart width={400} height={150}>
                    <Pie cx={100} cy={70} isAnimationActive={true} data={chartData} outerRadius={50} fill="#58747E" 
                        labelLine={true} label={true} dataKey="value" nameKey="name">
                        {
                            chartData.map((entry, i) => <Cell fill={pieColors[i]} key={i}/>)
                        }
                    </Pie>   
                    <Legend layout="vertical" align="right" verticalAlign="top" width={190} iconType="square" iconSize={12}/>
                </PieChart>  
            </div>
        </div>
    );
}

export default CategoriesPieChart;