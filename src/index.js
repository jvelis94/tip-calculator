import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';

function AddPerson(props) {
    return (
            <button className='addPerson' onClick={props.onClicked}>Add Person</button>
    );
}

function PersonList(props) {
    return (
        <div>
        {props.list.map((name) => (
            <span key={name}>{name}</span>
        ))}
        </div>
    );
};

class Details extends React.Component {
    constructor(props) {
        super(props); 
            this.state = {
                meal_total: 0,
                tax: 0,
                tip: 0,
                grand_total: 0,
                clicked: [],
            };
            this.handleClick = this.handleClick.bind(this)
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

    renderPerson = () => {
        return (
            <Person
                person_tax = {this.state.tax}
                person_tip = {this.state.tip}
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

    handleClick = () => {
        let clickedPlus = this.state.clicked.concat(this.renderPerson())
        this.setState({
            clicked: clickedPlus,
        });
        this.state.clicked.length < 10 ? console.log(this.state.clicked) : this.renderPerson() 
    }

    render() {
        let grand_total = parseFloat(this.state.meal_total) * (1 + parseFloat(this.state.tax)/100) * (1 + parseFloat(this.state.tip)/100);
        return (
            <div className='details'>
                <form>
                    <label htmlFor='meal'>Meal total: </label>
                    <input name='meal' placeholder={this.state.meal_total} onChange={this.handleMealChange}></input><br></br>
                    <label htmlFor='tax'>Tax: </label>
                    <input name='tax' placeholder={this.state.tax} onChange={this.handleTaxChange}></input><br></br>
                    <label htmlFor='tip'>Tip: </label>
                    <input name='tip' placeholder={this.state.tip} onChange={this.handleTipChange}></input><br></br>
                    <label htmlFor='total'>Grand Total:</label>
                    <input name='total' value={grand_total} readOnly></input><br></br>
                </form>
                {this.renderPerson()}
                <PersonList list={this.state.clicked} />
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
        let person_total = parseFloat(this.state.person_meal_total) * (1 + parseFloat(this.props.person_tax/100)) * (1 + parseFloat(this.props.person_tip)/100);

        return (
            <div className='person'>
                <h3>Person #1</h3>
                <form>
                    <label htmlFor='person-meal'>Meal total: </label>
                    <input name='person-meal' value={this.state.person_meal_total} onChange={this.handlePersonTotal}></input>
                </form>
                <h3>Should Pay</h3>
                    <p>Tax: {(parseFloat(this.props.person_tax)/100) * parseFloat(this.state.person_meal_total)}</p>
                    <p>Tip: {(parseFloat(this.props.person_tip)/100) * parseFloat(this.state.person_meal_total)}</p>
                    <p>Total: {person_total}</p>
            </div>
        )
    }
}

class Calculator extends React.Component {
    render() {
        return (
            <div>
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
