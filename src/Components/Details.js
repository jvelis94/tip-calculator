import React from 'react';
import {Person, PersonList} from './Person.js'
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
            
            this.handleClick = this.handleClick.bind(this)
            this.handleMealChange = this.handleMealChange.bind(this)
            this.handleSharedItemsChange = this.handleSharedItemsChange.bind(this)
            this.handleTaxChange = this.handleTaxChange.bind(this)
            this.handleTipChange = this.handleTipChange.bind(this)
    }

    handleMealChange = event => {
        this.setState({
            meal_subtotal: event.target.value,
        });
    };

    handleDinersChange = event => {
        this.setState({
            diners: event.target.value,
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
                        <label htmlFor='meal'>Meal subtotal: ($)</label><br></br>
                        <input name='meal' placeholder={this.state.meal_subtotal} onChange={this.handleMealChange}></input><br></br>
                        <label htmlFor='meal'>Shared items: ($)</label><br></br>
                        <input name='meal' placeholder={this.state.shared_items} onChange={this.handleSharedItemsChange}></input><br></br>
                        <label htmlFor='tax'>Tax: (%)</label><br></br>
                        <input name='tax' placeholder={this.state.tax} onChange={this.handleTaxChange}></input><br></br>
                        <label htmlFor='tip'>Tip: (%)</label><br></br>
                        <input name='tip' placeholder={this.state.tip} onChange={this.handleTipChange}></input><br></br>
                        <label htmlFor='total'>Grand Total: ($)</label><br></br>
                        <input name='total' value={grand_total.toFixed(2)} readOnly></input><br></br>
                        <label htmlFor='total'># of Diners: </label><br></br>
                        <input name='total' placeholder={this.state.diners} onChange={this.handleDinersChange}></input><br></br>
                    </form>
                </div>
                <PersonList persons={this.state.persons} />
                {this.renderAddPerson()}
            </div>
        );
    }
}

export default Details