import React from 'react';
import dateFnsFormat from 'date-fns/format';
import { Constants, Settings } from '../utils/Constants';
import './AddForm.css';

const MSG_PARSING_ERROR = 'Please enter a correct value';

class SpendingsForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            valDay: this.initDay(),
            valCategory: 'food',
            valAmount: '',
            valComment: '',
            showParsingError: false
        };
    }

    initDay() { // TODO Does not update when selected day changes
        if (this.props.selectedDay) {
            return dateFnsFormat(this.props.selectedDay, Constants.DATE_FORMAT_INPUT);
        }
        return null;
    }

    handleDay(e) {
        console.log('day input: ' + e.target.value);
        this.setState({ valDay: e.target.value });
    }

    handleCategory(e) {
        this.setState({ valCategory: e.target.value });
    }

    handleAmount(e) {
        this.setState({ valAmount: e.target.value.replace(',', '.') });
    }

    handleComment(e) {
        this.setState({ valComment: e.target.value });
    }

    handleFormInput(e) {
        e.preventDefault();
        let amount = parseFloat(this.state.valAmount);
        if(isNaN(amount)) {
            this.setState({ showParsingError: true });
        } else {
            this.setState({ showParsingError: false });
            this.props.addSpendingsPosition(this.state.valCategory, amount, this.state.valComment, this.state.valDay);
        }
        this.setState({ valComment: '', valAmount: '' });
    }

    handleFormInputAndClose(e) {
        this.handleFormInput(e);
        this.props.onClose();
    }


    render() {
        if(!this.props.isVisible) {
            return null;
        }

        let categories = Settings.SPENDING_CATEGORIES.map((cat) => {
            return (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
            );
        });

        // TODO how show error message?
        let styleErrorMsg = {
            display: this.state.showParsingError ? 'inline' : 'none', 
            color: 'red'
        };


        return (
            <div id="add-modal">
                <button className="close-X" onClick={this.props.onClose}>x</button>

                <form id="add-form">
                    <table>
                        <tbody>
                            <tr>
                                <td>Date: </td>
                                <td><input type="date" 
                                           value={this.state.valDay} 
                                           onChange={(e) => this.handleDay(e)} 
                                           placeholder={this.props.selectedDay}/></td>
                            </tr>
                            <tr>
                                <td>Category: </td>
                                <td><select value={this.valCategory} onChange={(e) => this.handleCategory(e)}>{categories}</select></td>
                            </tr>
                            <tr>
                                <td>Amount spent: </td>
                                <td>
                                    <input type="text" 
                                           value={this.state.valAmount.toLocaleString(Settings.LOCALE_CURRENCY, Constants.LOCALE_DECIMAL_OPTIONS)} 
                                           onChange={(e) => this.handleAmount(e)} />
                                </td>
                            </tr>
                            {/*<tr>
                                <td></td>
                                <td style={styleErrorMsg}>{MSG_PARSING_ERROR}</td>
                            </tr>*/}
                            <tr>
                                <td>Comment: </td>
                                <td>
                                    <input type="text" 
                                           maxLength="150" 
                                           value={this.state.valComment} 
                                           onChange={(e) => this.handleComment(e)} />
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>
                                    <input type="submit" onClick={(e) => this.handleFormInput(e)} value="Submit + Add next"/>
                                    <input type="submit" onClick={(e) => this.handleFormInputAndClose(e)} value="Submit + Close"/>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        );
    }
}

export default SpendingsForm;