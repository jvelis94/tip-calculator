import React from 'react';

class Person extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            person_meal_subtotal: 0,
        }
    }

    handlePersonSubtotal = event => {
        this.setState({
            person_meal_subtotal: event.target.value
        });
    };

    
    
    render() {
        let shared_total = parseFloat(this.props.shared_items) / this.props.diners +  (parseFloat(this.props.shared_items) / this.props.diners * (this.props.tax/100)) + (parseFloat(this.props.shared_items) / this.props.diners * (this.props.tip/100))
        let person_total = parseFloat(this.state.person_meal_subtotal) + shared_total + ((parseFloat(this.state.person_meal_subtotal)) * (parseFloat(this.props.tax)/100)) + ((parseFloat(this.state.person_meal_subtotal)) * (parseFloat(this.props.tip)/100));
        return (
            <div className='person'>
                <div className='total-details'>
                    <h3>Person {this.props.person_num} </h3>
                    <form>
                        <label htmlFor='person-meal'>Personal Subtotal: $ </label>
                        <input name='person-meal' value={this.state.person_meal_subtotal} onChange={this.handlePersonSubtotal}></input>
                    </form>
                </div>
                <div className='breakdown'>
                    <h3>Should Pay</h3>
                    <div className='person-details'>
                        <p className='tooltip'>Shared: ${shared_total.toFixed(2)}<span className='tooltiptext'>tax is included in this amount</span></p><br></br>
                        <p>Tax: ${((parseFloat(this.props.tax)/100) * parseFloat(this.state.person_meal_subtotal)).toFixed(2)}</p><br></br>
                        <p>Tip: ${((parseFloat(this.props.tip)/100) * parseFloat(this.state.person_meal_subtotal)).toFixed(2)}</p><br></br>
                        <p>Total: ${person_total.toFixed(2)}</p>
                    </div>
                </div>    
            </div>
        )
    }
}

export {Person}