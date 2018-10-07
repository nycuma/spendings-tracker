import React from 'react';
import { Constants, Settings } from '../utils/Constants';
import './SpendingsForm.css';

const MSG_PARSING_ERROR = 'Please enter a correct value';

class SpendingsForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            valCategory: 'food',
            valAmount: 2.00,
            valComment: '',
            showParsingError: false
        };
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
            this.props.addSpendingsPosition(this.state.valCategory, amount, this.state.valComment);
        }
        this.setState({ valComment: '' });
    }


    render() {
        let categories = Settings.SPENDING_CATEGORIES.map((cat) => {
            return (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
            );
        });

        let styleErrorMsg = {
            display: this.state.showParsingError ? 'inline' : 'none', 
            color: 'red'
        };

        return (
            <div>
                
                <p className="head-add-form">Add a new spendings position</p>
                <form id="add-form">
                    <table>
                        <tbody>
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
                            <tr>
                                <td></td>
                                <td style={styleErrorMsg}>{MSG_PARSING_ERROR}</td>
                            </tr>
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
                                <td><button type="submit" onClick={(e) => this.handleFormInput(e)}>Submit</button></td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        );
    }
}

export default SpendingsForm;