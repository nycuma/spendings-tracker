import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SpendingsSingleDay from './tiles/SpendingsSingleDay';
import TotalSpendings from './tiles/TotalSpendings';
import CategoriesPieChart from './tiles/CategoriesPieChart';
import RecentHistory from './tiles/RecentHistory';
import RecurrentSpendings from './tiles/RecurrentSpendings';
import { Constants } from '../utils/Constants';
import './tiles/Tiles.scss';

const mapStateToProps = (state) => ({ currency: state.settings.currency });

class Tiles extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            display : {
                catPieChart: true,
                spendingsSingleDay: true,
                totalSpendings: true,
                recentHistory: true,
                recurrentSpendings: true
            },
            fadeout: {
                catPieChart: false,
                spendingsSingleDay: false,
                totalSpendings: false,
                recentHistory: false,
                recurrentSpendings: false
            }
        };
    }

    toggleDisplay(tile) {
        this.setState({ fadeout: {...this.state.fadeout, ...{[tile] : !this.state.fadeout[tile]} } });
        setTimeout(() => {
            this.setState({ display: {...this.state.display, ...{[tile] : !this.state.display[tile]} } });
        }, 500);
    }

    render() {
        let currencyOptions = { ...Constants.DEFAULT_CURRENCY_OPTIONS, ...{ currency: this.props.currency }};
        return (
            <div id="tiles" className="box">
                {this.state.display.catPieChart && 
                    <CategoriesPieChart 
                        toggleDisplay={(t) => this.toggleDisplay(t)}
                        fadeout={this.state.fadeout.catPieChart}
                    />
                }

                {this.state.display.spendingsSingleDay &&
                    <SpendingsSingleDay
                        toggleDisplay={(t) => this.toggleDisplay(t)}
                        currencyOptions={currencyOptions}
                        fadeout={this.state.fadeout.spendingsSingleDay}
                        onlyToday={true}
                    />
                }  

                {this.state.display.totalSpendings &&
                    <TotalSpendings 
                        toggleDisplay={(t) => this.toggleDisplay(t)}
                        currencyOptions={currencyOptions}
                        fadeout={this.state.fadeout.totalSpendings}
                    />
                }

                {this.state.display.recentHistory &&
                    <RecentHistory 
                        toggleDisplay={(t) => this.toggleDisplay(t)}
                        currencyOptions={currencyOptions}
                        fadeout={this.state.fadeout.recentHistory}
                    />
                }

                {this.state.display.spendingsSingleDay &&
                    <SpendingsSingleDay
                        toggleDisplay={(t) => this.toggleDisplay(t)}
                        currencyOptions={currencyOptions}
                        fadeout={this.state.fadeout.spendingsSingleDay}
                        onlyToday={false}
                        selectedDay={this.props.selectedDay}
                    />
                }  

                {this.state.display.recurrentSpendings &&
                    <RecurrentSpendings 
                        toggleDisplay={(t) => this.toggleDisplay(t)}
                        currencyOptions={currencyOptions}
                        fadeout={this.state.fadeout.recurrentSpendings}
                    />
                } 
            </div>
        );
    }
}

Tiles.propTypes = {
    selectedDay: PropTypes.instanceOf(Date).isRequired,
    currency: PropTypes.string
};

export default connect(mapStateToProps)(Tiles);