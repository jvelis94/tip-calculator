import React from 'react';
import {Person} from './Person.js'
import AddPersonBtn from './AddPersonBtn.js'

class Details extends React.Component {
    constructor(props) {
        super(props); 
            this.state = {
                meal_subtotal: 0,
                shared_items: 0,
                tax: 0,
                tip: 0,
                counter: 0,
            };
        
    }

    handleInputChange = event => {
        const target_value = event.target.value
        const name = event.target.name
        this.setState({
            [name]: target_value
        });
    };

    handleClick = (event) => {
        if (this.state.meal_subtotal === 0) {
            alert('Please fill the above form before continuing');
        } else {
        let counter = this.state.counter + 1
        this.setState({
            counter: counter,
        });}
    }

    renderPerson = () => {
        return (
            <Person
                tax = {this.state.tax}
                tip = {this.state.tip}
                shared_items = {this.state.shared_items}
                counter = {this.state.counter}
            />
        )
    }

    render() {
        const {counter, tax, tip, shared_items} = this.state
        let persons = []
        let i = 0;
        while (i < counter) {
            persons.push(
            <Person
                tax = {tax}
                tip = {tip}
                shared_items = {shared_items}
                diners = {counter}
            />)
            i++
        }
        
        let grand_total = parseFloat(this.state.meal_subtotal) + ((parseFloat(this.state.meal_subtotal)) * (parseFloat(this.state.tax)/100)) + ((parseFloat(this.state.meal_subtotal)) * (parseFloat(this.state.tip)/100));
        return (
            <div className='details'>
                <div className='order-total'>
                    <form>
                        <label htmlFor='meal_subtotal'>Meal subtotal: ($)</label><br></br>
                        <input name='meal_subtotal' placeholder={this.state.meal_subtotal} onChange={this.handleInputChange}></input><br></br>
                        <label htmlFor='shared_items'>Shared items: ($)</label><br></br>
                        <input name='shared_items' placeholder={this.state.shared_items} onChange={this.handleInputChange}></input><br></br>
                        <label htmlFor='tax'>Tax: (%)</label><br></br>
                        <input name='tax' placeholder={this.state.tax} onChange={this.handleInputChange}></input><br></br>
                        <label htmlFor='tip'>Tip: (%)</label><br></br>
                        <input name='tip' placeholder={this.state.tip} onChange={this.handleInputChange}></input><br></br>
                        <label htmlFor='total'>Grand Total: ($)</label><br></br>
                        <input name='total' value={grand_total.toFixed(2)} readOnly></input><br></br>
                    </form>
                </div>
                {persons}
                <AddPersonBtn handleClick={this.handleClick} />

            </div>
        );
    }
}

export default Details