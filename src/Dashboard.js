import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import uuidv4 from 'uuid/v4';
import Calender from './dashboard/Calender';
import AddForm from './dashboard/AddForm';
import Tiles from './dashboard/Tiles';
import { addSpending } from './utils/ReduxStore';
import { getSpendingsRecentlyAdded } from './utils/LocalStore';
import { PreferenceConsumer } from './utils/Contexts';
import './dashboard/Dashboard.scss';

const mapDispatchToProps = dispatch => ({ 
    addSpending: spending => dispatch(addSpending(spending))
});

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDay: new Date(),
            recentSpendings: [],
            addFormIsVisible: false
        };
    }

    componentDidMount() {
        this.fileSelector = this.initFileSelector();
        this.setState({
            // load recent spendings
            recentSpendings: getSpendingsRecentlyAdded(15)
        });
    }

    initFileSelector() {
        const fileSelector = document.createElement('input');
        fileSelector.setAttribute('type', 'file');
        fileSelector.setAttribute('multiple', true);
        fileSelector.onchange = this.handleFileUpload;
        return fileSelector;
    }

    updateSelectedDay(day) {
        this.setState({ selectedDay: day });
    }

    addSpendingsPosition(cat, amount, comment, day) {
        const date = day ? new Date(day) : this.state.selectedDay;
        const newSpending = {
            id: uuidv4(),
            day: date,
            cat: cat,
            amount: amount,
            comment: comment
        };

        this.setState({
            recentSpendings: [newSpending].concat(this.state.recentSpendings)
        });
        this.props.addSpending(newSpending);
    }

    openAddModal() {
        this.setState({ addFormIsVisible: true });
    }

    openImportModal(e) {
        e.preventDefault();
        this.fileSelector.click();
    }

    handleFileUpload(e) {
        e.preventDefault();
        let files = e.target.files;
        if(!files) {
            console.log('No files to upload found');
            return;
        }

        for(let i = 0; i < files.length; i++) {
             if(files[i].type === 'application/json') {
                 let reader = new FileReader();

                 reader.onload = () => {
                    let json = JSON.parse(reader.result);
                    if(json && json.data) {
                        json.data.forEach((item) => {
                            this.addSpendingsPosition(item.cat, item.amount, item.comment, new Date(item.day));
                        });
                    } 
                 };

                 reader.onerror = (err) => {
                    console.log('error while reading file: ' + err); // TODO Display error msg
                 };
                 reader.readAsText(files[i]);
             } else {
                console.log('Error: File is not a JSON document...');
                // TODO Display error msg
            }
        }
    }

    onClose() {
        this.setState({
            addFormIsVisible: false
        });
    }

    render() {
        return (
            <div id="dashboard" className="box">
                    <Tiles 
                        selectedDay={this.state.selectedDay}
                        recentSpendings={this.state.recentSpendings}
                    />

                    <Calender
                        selectedDay={this.state.selectedDay}
                        updateSelectedDay={(day) => this.updateSelectedDay(day)}
                        openAddModal={() => this.openAddModal()}  
                        openImportModal={(e) => this.openImportModal(e)}  
                    />

                    {this.state.addFormIsVisible &&
                        <PreferenceConsumer>
                            {({locale, categories}) => (
                                <AddForm 
                                    selectedDay={this.state.selectedDay}
                                    addSpendingsPosition={(cat, amount, comment, day) => this.addSpendingsPosition(cat, amount, comment, day)} 
                                    onClose={() => this.onClose()}
                                    locale={locale}
                                    categories={categories}
                                /> 
                            )}
                        </PreferenceConsumer>
                        
                    }
                
            </div>
        );
    }
}

Dashboard.propTypes = {
    addSpending: PropTypes.func.isRequired
};

export default connect(null, mapDispatchToProps)(Dashboard);