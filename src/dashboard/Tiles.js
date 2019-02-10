import React from 'react';
import PropTypes from 'prop-types';
import SpendingsToday from './tiles/SpendingsToday';
import SpendingsSingleDay from './tiles/SpendingsSingleDay';
import TotalSpendings from './tiles/TotalSpendings';
import CategoriesPieChart from './tiles/CategoriesPieChart';
import RecentHistory from './tiles/RecentHistory';
import RecurrentSpendings from './tiles/RecurrentSpendings';
import { PreferenceContext } from '../utils/Contexts';
import { Constants } from '../utils/Constants';
import './tiles/Tiles.css';

class Tiles extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayCatPieChart: true,
            displaySpendingsSingleDay: true,
            displayTotalSpendings: true,
            displayRecentHistory: true,
            displaySpendingsToday: true,
            displayRecurrentSpendings: true
        };
    }

    render() {
        return (
            <PreferenceContext.Consumer>
            {({currency, locale, categories}) => {
                let currencyOptions = { ...Constants.DEFAULT_CURRENCY_OPTIONS, ...{ currency: currency }};

                return (
                    <div id="tiles" className="box">
                        {this.state.displayCatPieChart && 
                            <CategoriesPieChart 
                                categories={categories}
                            />
                        }
        
                        {this.state.displaySpendingsToday &&
                            <SpendingsToday 
                                locale={locale}
                                currencyOptions={currencyOptions}
                                categories={categories}
                            />
                        }
        
                        {this.state.displayTotalSpendings &&
                            <TotalSpendings 
                                totalAmountToday={this.props.totalAmountToday}
                                totalAmountWeek={this.props.totalAmountWeek}
                                totalAmountMonth={this.props.totalAmountMonth}
                                totalAmountYear={this.props.totalAmountYear}
                                locale={locale}
                                currencyOptions={currencyOptions}
                            />
                        }
        
                        {this.state.displayRecentHistory &&
                            <RecentHistory 
                                recentSpendings={this.props.recentSpendings}
                                locale={locale}
                                currencyOptions={currencyOptions}
                            />
                        }
        
                        {this.state.displaySpendingsSingleDay &&
                            <SpendingsSingleDay
                                totalAmountDay={this.props.totalAmountDay}
                                spendingsForDay={this.props.spendingsForDay}
                                selectedDay={this.props.selectedDay}
                                locale={locale}
                                currencyOptions={currencyOptions}
                                categories={categories}
                            />
                        }  
        
                        {this.state.displayRecurrentSpendings &&
                            <RecurrentSpendings 
                                locale={locale}
                                currencyOptions={currencyOptions}
                            />
                        } 
                    </div>
                );
            }}
            </PreferenceContext.Consumer>
            
        );
    }

}

Tiles.propTypes = {
    selectedDay: PropTypes.instanceOf(Date).isRequired,
    totalAmountDay: PropTypes.number,
    totalAmountToday: PropTypes.number,
    totalAmountWeek: PropTypes.number,
    totalAmountMonth: PropTypes.number,
    totalAmountYear: PropTypes.number,
    spendingsForDay: PropTypes.arrayOf(PropTypes.object),
    recentSpendings: PropTypes.arrayOf(PropTypes.object)
};

export default Tiles;