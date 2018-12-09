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
                <h3>Spendings on Categories</h3>
            </div>
        );
    }
}

export default CategoriesPieChart;