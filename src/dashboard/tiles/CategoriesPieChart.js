import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { PieChart, Pie, Legend, Cell } from 'recharts';
import Utils from '../../utils/Utils';
import './Tiles.scss';

const mapStateToProps = (state) => ({ 
    spendings: state.spendings,
    categories: state.settings.categories
});

function CategoriesPieChart(props) {
    const data = Utils.calculateTotalAmountsByCategories(props.spendings, props.categories);
    let pieColors = [];
    let chartData;

    if(!data || data.length === 0) {
        pieColors.push('#f1f4f4');
        chartData = [{
            name: 'No data available',
            value: 1
        }];
    } else {
        chartData = props.categories.map((cat, i) => {
        pieColors.push(cat.color);
        return { 
            name: cat.label.length <= 20 ? cat.label : cat.label.substring(0, 18) + '...',
            value: data[i].amount };
        });
    }
    let classes = props.fadeout ? 'tile fade-out' : 'tile';
    return (
        <div className={classes}>
            <button className="close-tile" title="Close" onClick={() => props.toggleDisplay('catPieChart')}>
                x
            </button>
            <h4>Spendings on Categories</h4>
            <div id="piechart">
                <PieChart width={400} height={150}>
                    <Pie cx={100} cy={70} isAnimationActive={true} data={chartData} outerRadius={65} fill="#58747E" 
                        labelLine={false} label={false} dataKey="value" nameKey="name">
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

CategoriesPieChart.propTypes = {
    toggleDisplay: PropTypes.func.isRequired,
    categories: PropTypes.arrayOf(PropTypes.object).isRequired,
    fadeout: PropTypes.bool.isRequired,
    spendings: PropTypes.arrayOf(PropTypes.object)
};


export default connect(mapStateToProps)(CategoriesPieChart);