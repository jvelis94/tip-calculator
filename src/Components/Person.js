import React from 'react';
import Items from './Items.js'

class Person extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item: 0,
            item_quantity: 0
        }
    }

    handleInput = event => {
        const target_value = event.target.value
        const name = event.target.name
        this.setState({
            [name]: target_value,
        });
    };

    
    
    render() {
        let shared_total = parseFloat(this.props.shared_items) / this.props.diners +  (parseFloat(this.props.shared_items) / this.props.diners * (this.props.tax/100)) + (parseFloat(this.props.shared_items) / this.props.diners * (this.props.tip/100))
        let item_total = parseFloat(this.state.item) * parseFloat(this.state.item_quantity)
        let person_total = parseFloat(item_total) + shared_total + ((parseFloat(item_total)) * (parseFloat(this.props.tax)/100)) + ((parseFloat(item_total)) * (parseFloat(this.props.tip)/100));
        return (
            <div className='person'>
                <div className='total-details'>
                    <h3>Person {this.props.person_num} </h3>
                    <Items 
                        item = {this.state.item}
                        item_quantity = {this.state.item_quantity}
                        handleInput = {this.handleInput}
                    />
                    <p>Person Subtotal: ${item_total}</p><br></br>
                </div>
                <div className='breakdown'>
                    <h3>Should Pay</h3>
                    <div className='person-details'>
                        <p className='tooltip'>Shared: ${shared_total.toFixed(2)}<span className='tooltiptext'>tax is included in this amount</span></p><br></br>
                        <p>Tax: ${((parseFloat(this.props.tax)/100) * parseFloat(item_total)).toFixed(2)}</p><br></br>
                        <p>Tip: ${((parseFloat(this.props.tip)/100) * parseFloat(item_total)).toFixed(2)}</p><br></br>
                        <p>Total: ${person_total.toFixed(2)}</p>
                    </div>
                </div>    
            </div>
        )
    }
}

export {Person}