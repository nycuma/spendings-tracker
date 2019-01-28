import React from 'react';
import SpendingsToday from './tiles/SpendingsToday';
import SpendingsSingleDay from './tiles/SpendingsSingleDay';
import TotalSpendings from './tiles/TotalSpendings';
import CategoriesPieChart from './tiles/CategoriesPieChart';
import RecentHistory from './tiles/RecentHistory';
import './tiles/Tiles.css';

class Tiles extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayCatPieChart: true,
            displaySpendingsSingleDay: true,
            displayTotalSpendings: true,
            displayRecentHistory: true,
            displaySpendingsToday: true
        };
    }

    render() {
        return (
            <div id="tiles" className="box">
                {this.state.displayCatPieChart && 
                    <CategoriesPieChart />
                }

                {this.state.displaySpendingsToday &&
                    <SpendingsToday />
                }

                {this.state.displayTotalSpendings &&
                    <TotalSpendings 
                        totalAmountDay={this.props.totalAmountDay}
                        totalAmountWeek={this.props.totalAmountWeek}
                        totalAmountMonth={this.props.totalAmountMonth}
                        totalAmountYear={this.props.totalAmountYear}
                    />
                }

                {this.state.displayRecentHistory &&
                    <RecentHistory 
                        recentSpendings={this.props.recentSpendings}
                    />
                }

                {this.state.displaySpendingsSingleDay &&
                    <SpendingsSingleDay
                        totalAmountDay={this.props.totalAmountDay}
                        spendingsForDay={this.props.spendingsForDay}
                        selectedDay={this.props.selectedDay}
                    />
                }   
                
            </div>
        );
    }

}

export default Tiles;