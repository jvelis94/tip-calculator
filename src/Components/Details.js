import React from 'react';
import {Person} from './Person.js'
import AddPersonBtn from './AddPersonBtn.js'

function MealSub(props) {
    return (
        <form>
            <label htmlFor='meal_subtotal'>Meal subtotal: ($)</label><br></br>
            <input name='meal_subtotal' placeholder={props.meal_subtotal} onChange={props.handleInputChange}></input><br></br>
            <button onClick = {props.handleSubmitShared}>Next</button>
        </form>
        )
}

function SharedItems(props) {
    return (
        <form>
            <label htmlFor='shared_items'>Shared items: ($)</label><br></br>
            <input name='shared_items' placeholder={props.shared_items} onChange={props.handleInputChange}></input><br></br>
            <button onClick = {props.handleSubmitTax}>Next</button>
        </form>
    )
}

function Tax(props) {
    return (
        <form>    
            <label htmlFor='tax'>Tax: (%)</label><br></br>
            <input name='tax' placeholder={props.tax} onChange={props.handleInputChange}></input><br></br>
            <input type='submit' value='Next'></input>
        </form>
    )
}

function Tip(props) {
    return (
        <form>
            <label htmlFor='tip'>Tip: (%)</label><br></br>
            <input name='tip' placeholder={props.tip} onChange={props.handleInputChange}></input><br></br>
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
                meal_subtotal: {
                    value: 0,
                    display: true
                },
                shared_items: {
                    value: 0,
                    display: false
                },
                tax: {
                    value: 0,
                    display: false
                },
                tip: {
                    value: 0,
                    display: false
                },
                counter: 0,
                person_num: []
            };
        
    }

    handleInputChange = event => {
        const target_value = event.target.value
        const name = event.target.name
        this.setState({
            [name]: {
                value: target_value,
                display: true
            }
        });
    };

    handleClick = () => {
        if (this.state.meal_subtotal.value === 0) {
            alert('Please fill the above form before continuing');
        } else {
        let counter = this.state.counter + 1
        let addPerson = this.state.person_num.concat(counter)
        this.setState({
            counter: counter,
            person_num: addPerson
        });}
    }

    handleSubmitShared = (event) => {
        event.preventDefault()
        this.setState((currentState) => {
            return {
            shared_items: {
                value: currentState.shared_items.value,
                display: true
            }}
        }) 
    }

    handleSubmitTax = (event) => {
        event.preventDefault()
        this.setState((currentState) => {
            return {
            tax: {
                value: currentState.tax.value,
                display: true
            }}
        }) 
    }

    renderPerson = () => {
        return (
            <Person
                tax = {this.state.tax.value}
                tip = {this.state.tip.value}
                shared_items = {this.state.shared_items.value}
                counter = {this.state.counter.value}
            
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
                tax = {tax.value}
                tip = {tip.value}
                shared_items = {shared_items.value}
                diners = {counter}
                person_num = {person_num[i]}
            />)
            i++
        }

        let sharedComponent = []
        if (this.state.shared_items.display) {
            sharedComponent.push(
                <SharedItems 
                    shared_items = {this.state.shared_items.value} 
                    handleInputChange = {this.handleInputChange}
                    handleSubmitTax = {this.handleSubmitTax}
                   />
            )
        }

        let taxComponent = []
        if (this.state.tax.display) {
            taxComponent.push(
                <Tax 
                    tax = {this.state.tax.value} 
                    handleInputChange = {this.handleInputChange}
                    />
            )
        } 
        
        let tipComponent = []
        if (this.state.tip.display) {
            tipComponent.push(
                <Tip 
                    tip = {this.state.tip.value} 
                    handleInputChange = {this.handleInputChange}
                    />
            )
        } 

        let grandTotalComponent = []
        if (this.state.tax.display) {
            grandTotalComponent.push(
                <GrandTotal 
                    tip = {this.state.tip.value}
                    tax = {this.state.tax.value}
                    meal_subtotal = {this.state.meal_subtotal.value}
                    shared_items = {this.state.shared_items.value}
                    handleInputChange = {this.handleInputChange}
                    />  
            )
        } 
        
        
        
        return (
            <div className='details'>
                <div className='order-total'>
                  <MealSub 
                    meal_subtotal = {this.state.meal_subtotal.value}
                    handleInputChange = {this.handleInputChange}
                    handleSubmitShared = {this.handleSubmitShared}
                    />
                  {sharedComponent}
                  {taxComponent}
                  {tipComponent}
                  {grandTotalComponent}      
                </div>
                {persons}
                <AddPersonBtn handleClick={this.handleClick} />

            </div>
        );
    }
}

export default Details