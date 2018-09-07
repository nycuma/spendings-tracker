import React from 'react';
import dateFnsFormat from 'date-fns/format';
import Constants from '../utils/Constants';

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

    updateCategory(e) {
        this.setState({ valCategory: e.target.value });
    }

    updateAmount(e) {
        this.setState({ valAmount: e.target.value });
    }

    updateComment(e) {
        this.setState({ valComment: e.target.value });
    }

    handleFormInput(e) {
        e.preventDefault();
        let amount = parseFloat(this.state.valAmount);
        if(isNaN(amount)) {
            this.setState({ showParsingError: true });
        }
        // TODO
        //this.props.addSpendingsPosition(this.state.valCategory, amount.toFixed(2), this.state.valComment);
    }


    render() {
        let categories = Constants.SPENDING_CATEGORIES.map((cat) => {
            return (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
            );
        });

        let styleErrorMsg = {
            display: this.state.showParsingError ? 'inline' : 'none', 
            color: 'red'
        };

        return (
            <div className="box">
                <h2>Spendings for {dateFnsFormat(this.props.selectedDay, Constants.DATE_FORMAT)}</h2>

                <p>+ Add a new spendings position</p>
                <form>
                    <table>
                        <tbody>
                            <tr>
                                <td>Category: </td>
                                <td><select>{categories}</select></td>
                            </tr>
                            <tr>
                                <td>Amount spent: </td>
                                <td><input type="text" value={this.state.valAmount} onChange={(e) => this.updateAmount(e)} /></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td style={styleErrorMsg}>{MSG_PARSING_ERROR}</td>
                            </tr>
                            <tr>
                                <td>Comment: </td>
                                <td><input type="text" maxLength="150" value={this.state.valComment} onChange={(e) => this.updateComment(e)}/></td>
                            </tr>
                            <tr>
                                <td><button type="submit" 
                                onClick={(e) => this.handleFormInput(e)}>Submit</button></td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        );
    }
}

export default SpendingsForm;