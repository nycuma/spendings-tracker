import React from 'react';
import Calender from './spendings/Calender';
import SpendingsForm from './spendings/SpendingsForm';

class Spendings extends React.Component {
    render() {
        return (
            <div id="spendings">
                <h1 className="menu-item-headline">Spendings</h1>
                <Calender />
                <SpendingsForm /> 
            </div>
        );
    }
}

export default Spendings;