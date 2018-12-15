import React from 'react';
import './Tiles.css';

class CategoriesPieChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            unit: 'week'
        };
    }

    render() {
        return (
            <div className="tile">
                <h4>Spendings on Categories</h4>
            </div>
        );
    }
}

export default CategoriesPieChart;