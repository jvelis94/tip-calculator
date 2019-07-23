import React from 'react';

class Person extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            person_tax: props.person_tax,
            person_tip: props.person_tip,
            person_meal_subtotal: 0,
            shared_items: props.shared_items,
            diners: props.diners
        }
    }

    handlePersonSubtotal = event => {
        this.setState({
            person_meal_subtotal: event.target.value
        });
    };
    
    render() {
        let shared_total = parseFloat(this.state.shared_items) / this.state.diners +  (parseFloat(this.state.shared_items) / this.state.diners * (this.state.person_tax/100)) + (parseFloat(this.state.shared_items) / this.state.diners * (this.state.person_tip/100))
        let person_total = parseFloat(this.state.person_meal_subtotal) + shared_total + ((parseFloat(this.state.person_meal_subtotal)) * (parseFloat(this.state.person_tax)/100)) + ((parseFloat(this.state.person_meal_subtotal)) * (parseFloat(this.state.person_tip)/100));
        return (
            <div className='person'>
                <div className='total-details'>
                    <h3>Person {this.props.counter} </h3>
                    <form>
                        <label htmlFor='person-meal'>Personal Subtotal: $ </label>
                        <input name='person-meal' value={this.state.person_meal_subtotal} onChange={this.handlePersonSubtotal}></input>
                    </form>
                </div>
                <div className='breakdown'>
                    <h3>Should Pay</h3>
                    <div className='person-details'>
                        <p>Shared: ${shared_total.toFixed(2)}</p><br></br>
                        <p>Tax: ${((parseFloat(this.state.person_tax)/100) * parseFloat(this.state.person_meal_subtotal)).toFixed(2)}</p><br></br>
                        <p>Tip: ${((parseFloat(this.state.person_tip)/100) * parseFloat(this.state.person_meal_subtotal)).toFixed(2)}</p><br></br>
                        <p>Total: ${person_total.toFixed(2)}</p>
                    </div>
                </div>    
            </div>
        )
    }
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

export {Person, PersonList}