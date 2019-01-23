import React from 'react';
import { PieChart, Pie, Legend, Cell } from 'recharts';
import { Settings } from '../../utils/Constants';
import { getAmountSpentByCategory } from '../../utils/LocalStore';
import './Tiles.css';

function CategoriesPieChart(props) {
    const data = getAmountSpentByCategory();
    const pieColors = [];
    const chartData = Settings.SPENDING_CATEGORIES.map((cat, i) => {
        pieColors.push(cat.color);
        return { 
            name: cat.label.length <= 20 ? cat.label : cat.label.substring(0, 18) + '...',
            value: data[i].amount };
    });
    
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
                    <Legend layout="vertical" align="right" width={190} iconType="square" iconSize={12}/>
                </PieChart>  
            </div>
        </div>
    );
}

export default CategoriesPieChart;