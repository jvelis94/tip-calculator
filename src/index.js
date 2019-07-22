import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { parse } from '@babel/parser';
// import App from './App';
// import * as serviceWorker from './serviceWorker';

function Header() {
    return (
        <header>Split Bill Calculator</header>
    )
}

function AddPerson(props) {
    return (
        <div className='button'>
            <button className='addPerson' onClick={props.onClicked}>Add Person</button>
        </div>
    );
}

function PersonList(props) {
    return (
        <div>
        {props.persons.map((person, index) => (
            <span key={index}>{person}</span>
        ))}
        </div>
    );
};

class Details extends React.Component {
    constructor(props) {
        super(props); 
            this.state = {
                meal_total: 0,
                shared_items: 0,
                tax: 0,
                tip: 0,
                grand_total: 0,
                persons: [],
                counter: 1,
            };
            this.handleClick = this.handleClick.bind(this)
    }

    handleMealChange = event => {
        this.setState({
            meal_total: event.target.value,
        });
    };

    handleSharedItemsChange = event => {
        this.setState({
            shared_items: event.target.value,
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

    handleClick = () => {
        let clickedPlus = this.state.persons.concat(this.renderPerson())
        let counter = this.state.counter + 1
        this.setState({
            persons: clickedPlus,
            counter: counter,
        });
        
    }

    renderPerson = () => {
        return (
            <Person
                person_tax = {this.state.tax}
                person_tip = {this.state.tip}
                shared_items = {this.state.shared_items}
                counter = {this.state.counter}

            />
        )
    }

    renderAddPerson = () => {
        return (
            <AddPerson 
                onClicked= {() => this.handleClick()}    
                />
        );
    }

    render() {
        let grand_total = parseFloat(this.state.meal_total) + ((parseFloat(this.state.meal_total)) * (parseFloat(this.state.tax)/100)) + ((parseFloat(this.state.meal_total)) * (parseFloat(this.state.tip)/100)) + parseFloat(this.state.shared_items);
        return (
            <div className='details'>
                <div className='order-total'>
                    <form>
                        <label htmlFor='meal'>Meal total: ($)</label><br></br>
                        <input name='meal' placeholder={this.state.meal_total} onChange={this.handleMealChange}></input><br></br>
                        <label htmlFor='meal'>Shared items: ($)</label><br></br>
                        <input name='meal' placeholder={this.state.shared_items} onChange={this.handleSharedItemsChange}></input><br></br>
                        <label htmlFor='tax'>Tax: (%)</label><br></br>
                        <input name='tax' placeholder={this.state.tax} onChange={this.handleTaxChange}></input><br></br>
                        <label htmlFor='tip'>Tip: (%)</label><br></br>
                        <input name='tip' placeholder={this.state.tip} onChange={this.handleTipChange}></input><br></br>
                        <label htmlFor='total'>Grand Total: ($)</label><br></br>
                        <input name='total' value={grand_total.toFixed(2)} readOnly></input><br></br>
                    </form>
                </div>
                {this.renderPerson()}
                <PersonList persons={this.state.persons} />
                {this.renderAddPerson()}
            </div>
        );
    }
}

class Person extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            person_meal_total: [],
            person_total: 0,
        }
    }

    handlePersonTotal = event => {
        this.setState({
            person_meal_total: event.target.value
        });
    };
    
    render() {
        let person_total = parseFloat(this.state.person_meal_total) + parseFloat(this.props.shared_items) +     ((parseFloat(this.state.person_meal_total)) * (parseFloat(this.props.person_tax)/100)) + ((parseFloat(this.state.person_meal_total)) * (parseFloat(this.props.person_tip)/100));

        return (
            <div className='person'>
                <div className='total-details'>
                    <h3>Person</h3>
                    <form>
                        <label htmlFor='person-meal'>Personal subtotal: $ </label>
                        <input name='person-meal' value={this.state.person_meal_total} onChange={this.handlePersonTotal}></input>
                    </form>
                </div>
                <div className='breakdown'>
                    <h3>Should Pay</h3>
                    <div className='person-details'>
                        <p>Shared: ${(parseFloat(this.props.shared_items)/this.props.counter).toFixed(2)}</p>
                        <p>Tax: ${((parseFloat(this.props.person_tax)/100) * parseFloat(this.state.person_meal_total)).toFixed(2)}</p>
                        <p>Tip: ${((parseFloat(this.props.person_tip)/100) * parseFloat(this.state.person_meal_total)).toFixed(2)}</p>
                        <p>Total: ${person_total.toFixed(2)}</p>
                    </div>
                </div>    
            </div>
        )
    }
}

class Calculator extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <Details/>
            </div>
        )
    }
}

ReactDOM.render(<Calculator />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
