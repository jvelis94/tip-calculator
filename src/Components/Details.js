import React from 'react';
import {Person} from './Person.js'
import AddPersonBtn from './AddPersonBtn.js'

function MealSub(props) {
    return (
        <form>
            <label htmlFor='meal_subtotal'>Meal subtotal: ($)</label><br></br>
            <input name='meal_subtotal' placeholder={props.meal_subtotal} onChange={this.handleInputChange}></input><br></br>
            <input type='submit' value='Next'></input>
        </form>
        )
}

function SharedItems(props) {
    return (
        <form>
            <label htmlFor='shared_items'>Shared items: ($)</label><br></br>
            <input name='shared_items' placeholder={props.shared_items} onChange={this.handleInputChange}></input><br></br>
            <input type='submit' value='Next'></input>
        </form>
    )
}

function Tax(props) {
    return (
        <form>    
            <label htmlFor='tax'>Tax: (%)</label><br></br>
            <input name='tax' placeholder={props.tax} onChange={this.handleInputChange}></input><br></br>
            <input type='submit' value='Next'></input>
        </form>
    )
}

function Tip(props) {
    return (
        <form>
            <label htmlFor='tip'>Tip: (%)</label><br></br>
            <input name='tip' placeholder={props.tip} onChange={this.handleInputChange}></input><br></br>
            <input type='submit' value='Next'></input>
        </form>
    )
}

function GrandTotal(props) {
    let grand_total = parseFloat(props.meal_subtotal) + ((parseFloat(props.meal_subtotal)) * (parseFloat(props.tax)/100)) + ((parseFloat(props.meal_subtotal)) * (parseFloat(props.tip)/100));
    return (
        <form>
            <label htmlFor='total'>Grand total: ($)</label><br></br>
            <input name='total' value={grand_total.toFixed(2)} readOnly></input><br></br>
            <input type='submit' value='Next'></input>
        </form>
    )
}

class Details extends React.Component {
    constructor(props) {
        super(props); 
            this.state = {
                meal_subtotal: 0,
                shared_items: 0,
                tax: 0,
                tip: 0,
                counter: 0,
                person_num: []
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
        let addPerson = this.state.person_num.concat(counter)
        this.setState({
            counter: counter,
            person_num: addPerson
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
        const {counter, tax, tip, shared_items, person_num} = this.state
        let persons = []
        let i = 0;
        while (i < counter) {
            persons.push(
            <Person
                tax = {tax}
                tip = {tip}
                shared_items = {shared_items}
                diners = {counter}
                person_num = {person_num[i]}
            />)
            i++
        }
        
        
        return (
            <div className='details'>
                <div className='order-total'>
                  <MealSub 
                    meal_subtotal = {this.state.meal_subtotal}
                    handleInputChange = {this.handleInputChange}
                    />
                  <SharedItems 
                    shared_items = {this.state.shared_items} 
                    handleInputChange = {this.handleInputChange}
                    />
                  <Tax 
                    tax = {this.state.tax} 
                    handleInputChange = {this.handleInputChange}
                    />
                  <Tip 
                    tip = {this.state.tip} 
                    handleInputChange = {this.handleInputChange}
                    />
                  <GrandTotal 
                    tip = {this.state.tip}
                    tax = {this.state.tax}
                    meal_subtotal = {this.state.meal_subtotal}
                    shared_items = {this.state.shared_items}
                    handleInputChange = {this.handleInputChange}
                    />  
                </div>
                {persons}
                <AddPersonBtn handleClick={this.handleClick} />

            </div>
        );
    }
}

export default Details