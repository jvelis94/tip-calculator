import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';

class Details extends React.Component {
    constructor(props) {
        super(props); 
            this.state = {
                meal_total: 0,
                tax: 0,
                tip: 0,
                grand_total: 0,
            }
    }

    handleMealChange = event => {
        this.setState({
            meal_total: event.target.value,
        });
    };

    handleTaxChange = event => {
        this.setState({
            tax: event.target.value,
        });
    };

    handleTipChange = event => {
        this.setState({
            tip: event.target.value,
        });
    };

    render() {
        let grand_total= parseFloat(this.state.meal_total) + parseFloat(this.state.tax) + parseFloat(this.state.tip);
        return (
            <div className='details'>
                <form>
                    <label htmlFor='meal'>Meal total: </label>
                    <input name='meal' value={this.state.meal_total} onChange={this.handleMealChange}></input><br></br>
                    <label htmlFor='tax'>Tax: </label>
                    <input name='tax' value={this.state.tax} onChange={this.handleTaxChange}></input><br></br>
                    <label htmlFor='tip'>Tip: </label>
                    <input name='tip' value={this.state.tip} onChange={this.handleTipChange}></input><br></br>
                    <label htmlFor='total'>Grand Total:</label>
                    <input name='total' value={grand_total} readOnly></input><br></br>
                </form>
            </div>
        );
    }
}

class Person extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            person_meal_total: 100,
            person_total: 200,
        }
    }
    render() {
        return (
            <div className='person'>
                <h3>Person #1</h3>
                <form>
                    <label htmlFor='person-meal'>Meal total: </label>
                    <input name='person-meal'></input>
                </form>
                <h3>Should Pay</h3>
                    <p>Tax: {props.tax}</p>
                    <p>Tip: {props.tip}</p>
                    <p>Total: {this.state.person_total}</p>
            </div>
        )
    }
}

class AddPerson extends React.Component {
    renderPerson() {
        return (
            <Person/>
        )
    }
    render() {
        return (
            
                <button className='addPerson' onClick={() => this.renderPerson()}>Add Person</button>
            
        )
    }
}

class Calculator extends React.Component {
    render() {
        return (
            <div>
                <Details/>
                <Person/>
                <AddPerson/>
            </div>
        )
    }
}

ReactDOM.render(<Calculator />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
