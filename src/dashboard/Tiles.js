import React from 'react';
import PropTypes from 'prop-types';
import SpendingsSingleDay from './tiles/SpendingsSingleDay';
import TotalSpendings from './tiles/TotalSpendings';
import CategoriesPieChart from './tiles/CategoriesPieChart';
import RecentHistory from './tiles/RecentHistory';
import RecurrentSpendings from './tiles/RecurrentSpendings';
import { PreferenceConsumer } from '../utils/Contexts';
import { Constants } from '../utils/Constants';
import './tiles/Tiles.scss';

class Tiles extends React.Component {
    constructor(props) {
        super(props);
        this.toggleDisplay = this.toggleDisplay.bind(this);
        this.state = {
            display : {
                catPieChart: true,
                spendingsSingleDay: true,
                totalSpendings: true,
                recentHistory: true,
                recurrentSpendings: true
            }
        };
    }

    toggleDisplay(tile) {
        this.setState({ display: {...this.state.display, ...{[tile] : !this.state.display[tile]} } });
    }

    render() {
        return (
            <PreferenceConsumer>
            {({currency, locale, categories}) => {
                let currencyOptions = { ...Constants.DEFAULT_CURRENCY_OPTIONS, ...{ currency: currency }};

                return (
                    <div id="tiles" className="box">
                        {this.state.display.catPieChart && 
                            <CategoriesPieChart 
                                toggleDisplay={this.toggleDisplay}
                                categories={categories}
                            />
                        }

                        {this.state.display.spendingsSingleDay &&
                            <SpendingsSingleDay
                                toggleDisplay={this.toggleDisplay}
                                locale={locale}
                                currencyOptions={currencyOptions}
                                categories={categories}

                                onlyToday={true}
                                spendingsForDay={this.props.spendingsForDay}
                            />
                        }  
        
                        {this.state.display.totalSpendings &&
                            <TotalSpendings 
                                toggleDisplay={this.toggleDisplay}
                                totalAmountToday={this.props.totalAmountToday}
                                totalAmountWeek={this.props.totalAmountWeek}
                                totalAmountMonth={this.props.totalAmountMonth}
                                totalAmountYear={this.props.totalAmountYear}
                                locale={locale}
                                currencyOptions={currencyOptions}
                            />
                        }
        
                        {this.state.display.recentHistory &&
                            <RecentHistory 
                                toggleDisplay={this.toggleDisplay}
                                recentSpendings={this.props.recentSpendings}
                                locale={locale}
                                currencyOptions={currencyOptions}
                            />
                        }
        
                        {this.state.display.spendingsSingleDay &&
                            <SpendingsSingleDay
                                toggleDisplay={this.toggleDisplay}
                                locale={locale}
                                currencyOptions={currencyOptions}
                                categories={categories}

                                onlyToday={false}
                                totalAmountDay={this.props.totalAmountDay}
                                spendingsForDay={this.props.spendingsForDay}
                                selectedDay={this.props.selectedDay}
                            />
                        }  
        
                        {this.state.display.recurrentSpendings &&
                            <RecurrentSpendings 
                                toggleDisplay={this.toggleDisplay}
                                locale={locale}
                                currencyOptions={currencyOptions}
                            />
                        } 
                    </div>
                );
            }}
            </PreferenceConsumer>
            
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