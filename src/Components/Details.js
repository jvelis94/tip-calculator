import React from 'react';
import {Person} from './Person.js'
import AddPerson from './AddPersonBtn.js'

class Details extends React.Component {
    constructor(props) {
        super(props); 
            this.state = {
                meal_subtotal: 0,
                shared_items: 0,
                tax: 0,
                tip: 0,
                persons: [],
                counter: 1,
                diners: 0,
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
        let addPerson = this.state.persons.concat(this.renderPerson())
        this.setState({
            persons: addPerson,
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
                diners = {this.state.diners}
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
                        <label htmlFor='diners'># of Diners: </label><br></br>
                        <input name='diners' placeholder={this.state.diners} onChange={this.handleInputChange}></input><br></br>
                    </form>
                </div>

                {/* list of persons */}
                {this.state.persons.map((person, index) => (
                    <span key={index}>{person}</span>
                ))}
                {this.renderAddPerson()}
            </div>
        );
    }
}

export default Details