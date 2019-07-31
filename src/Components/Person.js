import React from 'react';
import Items from './Items.js'

class Person extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item: 0,
            item_quantity: 0,
            items_counter: 0,
            item_totals: [],
            items_totals_sum: 0
        }
    }

    handleInput = event => {
        const target_value = event.target.value
        const name = event.target.name
        this.setState({
            [name]: target_value,
        });
    };

    handleAddItemBtn = () => {
        let items_counter = this.state.items_counter + 1
        let item_totals = this.state.item_totals.concat([this.renderItemTotal()])
        const reducer = (accumulator, currentValue) => accumulator + currentValue
        let items_totals_sum = item_totals.reduce(reducer)
        this.setState({
            items_counter: items_counter,
            item_totals: item_totals,
            items_totals_sum: items_totals_sum
        })
    }

    renderItemTotal = () => {
        return parseFloat(this.state.item) * parseFloat(this.state.item_quantity)
    }
    
    render() {
        let shared_total = parseFloat(this.props.shared_items) / this.props.diners +  (parseFloat(this.props.shared_items) / this.props.diners * (this.props.tax/100)) + (parseFloat(this.props.shared_items) / this.props.diners * (this.props.tip/100))
        let person_total = parseFloat(this.state.items_totals_sum) + shared_total + ((parseFloat(this.state.items_totals_sum)) * (parseFloat(this.props.tax)/100)) + ((parseFloat(this.state.items_totals_sum)) * (parseFloat(this.props.tip)/100));
        let items = []
        let i = 0
        while (i < this.state.items_counter) {
            items.push(
                <Items 
                        item = {this.state.item}
                        item_quantity = {this.state.item_quantity}
                        handleInput = {this.handleInput}
                />
            )
            i++
        }
        return (
            <div className='person'>
                <div className='total-details'>
                    <h3>Person {this.props.person_num} </h3>
                    <Items 
                        item = {this.state.item}
                        item_quantity = {this.state.item_quantity}
                        handleInput = {this.handleInput}
                    />
                    {items}
                    <br/>
                    <div className='button-subtotal'>
                        <button onClick = {this.handleAddItemBtn}>Save Item</button>
                        <p>Subtotal: ${this.state.items_totals_sum}</p><br></br>
                    </div>
                </div>
                <div className='breakdown'>
                    <h3>Should pay</h3>
                    <div className='person-details'>
                        <p className='tooltip'>Shared: ${shared_total.toFixed(2)}<span className='tooltiptext'>tax is included in this amount</span></p><br></br>
                        <p>Tax: ${((parseFloat(this.props.tax)/100) * parseFloat(this.state.items_totals_sum)).toFixed(2)}</p><br></br>
                        <p>Tip: ${((parseFloat(this.props.tip)/100) * parseFloat(this.state.items_totals_sum)).toFixed(2)}</p><br></br>
                        <p>Total: ${person_total.toFixed(2)}</p>
                    </div>
                </div>    
            </div>
        )
    }
}

export {Person}