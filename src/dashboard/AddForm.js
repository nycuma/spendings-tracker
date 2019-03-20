import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import dateFnsFormat from 'date-fns/format';
import { Constants } from '../utils/Constants';
import './AddForm.scss';

const mapStateToProps = (state) => ({ 
    categories: state.settings.categories,
    locale: state.settings.locale
 });

class SpendingsForm extends React.Component {
    constructor(props) {
        super(props);
        this.nodeRef = React.createRef();
        this.state = {
            valDay: this.initDay(),
            valCategory: 'food',
            valAmount: '',
            valComment: '',
            showParsingError: false
        };
    }

    componentDidMount() {
        // add event listener for clicks outside of form
        document.addEventListener('click', (e) => this.handleClickOutideForm(e));
    }

    componentWillUnmount() {
        document.removeEventListener('click', (e) => this.handleClickOutideForm(e));
    }

    handleClickOutideForm(e) {
        if(this.nodeRef.current && !this.nodeRef.current.contains(e.target)) {
            this.props.onClose();
        } 
    }

    initDay() {
        if (this.props.selectedDay) {
            return dateFnsFormat(this.props.selectedDay, Constants.DATE_FORMAT_INPUT);
        }
        return null;
    }

    handleDay(e) {
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
        if(e.key && e.key !== 'Enter') {
            return;
        }
        this.handleFormInput(e);
        this.props.onClose();
    }

    render() {
        let categories = this.props.categories.map((cat) => {
            return (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
            );
        });

        const styleErrorInput = { 
            border: 'solid 1px red',
            backgroundColor: '#ffe6e6' 
        };
        const styleErrorTooltip = { 
            display: this.state.showParsingError ? 'inline' : 'none'
        };
        const msgError = 'Please enter a correct value';

        return (
            <div id="add-modal" ref={this.nodeRef}>
                <div id="tooltip-error" style={styleErrorTooltip}>{msgError}</div>
                <button className="close-X" onClick={this.props.onClose}>x</button>

                <form id="add-form">
                    <table>
                        <tbody>
                            <tr>
                                <td>Date: </td>
                                <td><input type="date" 
                                           value={this.state.valDay} 
                                           onChange={(e) => this.handleDay(e)} /></td>
                            </tr>
                            <tr>
                                <td>Category: </td>
                                <td><select value={this.valCategory} onChange={(e) => this.handleCategory(e)}>{categories}</select></td>
                            </tr>
                            <tr>
                                <td>Amount spent: </td>
                                <td>
                                    <input type="text" 
                                           style={this.state.showParsingError ? styleErrorInput : {}}
                                           value={this.state.valAmount.toLocaleString(this.props.locale, Constants.LOCALE_DECIMAL_OPTIONS)} 
                                           onChange={(e) => this.handleAmount(e)} 
                                           />
                                </td>
                            </tr>
                            <tr>
                                <td>Comment: </td>
                                <td>
                                    <input type="text" 
                                           maxLength="150" 
                                           value={this.state.valComment} 
                                           onChange={(e) => this.handleComment(e)}
                                           onKeyPress={(e) => this.handleFormInputAndClose(e)} />
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

SpendingsForm.propTypes = {
    selectedDay: PropTypes.instanceOf(Date).isRequired,
    locale: PropTypes.string.isRequired,
    categories: PropTypes.arrayOf(PropTypes.object).isRequired,
    addSpendingsPosition: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired
};

export default connect(mapStateToProps)(SpendingsForm);