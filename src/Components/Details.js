import React from 'react';
import {Person} from './Person.js'
import AddPersonBtn from './AddPersonBtn.js'
import {
    BrowserRouter,
    Route,
    Link,
  } from 'react-router-dom'

function MealSub(props) {
    return (
        <form>
            <label htmlFor='meal_subtotal'>Meal subtotal: ($)</label><br></br>
            <input name='meal_subtotal' placeholder={props.meal_subtotal} onChange={props.handleInputChange}></input><br></br>
            <Link to='/shared_items'>Next</Link>
        </form>
        )
}

function SharedItems(props) {
    return (
        <form>
            <label htmlFor='shared_items'>Shared items: ($)</label><br></br>
            <input name='shared_items' placeholder={props.shared_items} onChange={props.handleInputChange}></input><br></br>
            <Link to='/'>Back</Link>
            <Link to='/tax'>Next</Link>
        </form>
    )
}

function Tax(props) {
    return (
        <form>    
            <label htmlFor='tax'>Tax: (%)</label><br></br>
            <input name='tax' placeholder={props.tax} onChange={props.handleInputChange}></input><br></br>
            <Link to='/shared_items'>Back</Link>
            <Link to='/tip'>Next</Link>
        </form>
    )
}

function Tip(props) {
    return (
        <form>
            <label htmlFor='tip'>Tip: (%)</label><br></br>
            <input name='tip' placeholder={props.tip} onChange={props.handleInputChange}></input><br></br>
            <Link to='/tax'>Back</Link>
            <Link to='/grand_total'>Next</Link>
        </form>
    )
}

function GrandTotal(props) {
    let grand_total = parseFloat(props.meal_subtotal) + ((parseFloat(props.meal_subtotal)) * (parseFloat(props.tax)/100)) + ((parseFloat(props.meal_subtotal)) * (parseFloat(props.tip)/100));
    return (
        <form>
            <label htmlFor='total'>Grand total: ($)</label><br></br>
            <input name='total' value={grand_total.toFixed(2)} readOnly></input><br></br>
            <Link to='/tip'>Back</Link>
            <Link to='/person/1'>Add People</Link>
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
                counter: 1,
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
        let counter = this.state.counter + 1
        let addPerson = this.state.person_num.concat(counter)
        this.setState({
            counter: counter,
            person_num: addPerson
        });
    }

    render() {
        const {counter, tax, tip, shared_items, person_num} = this.state
        let persons = []
        let links = []
        let i = 1;
        while (i < counter) {
            persons.push(
                        <Person
                            tax = {tax}
                            tip = {tip}
                            shared_items = {shared_items}
                            diners = {counter}
                            person_num = {person_num[i]}
                        />
                    )
            
            links.push(<Link to={`/person/${i}`}>{`Person ${i}`}</Link>)
            i++
        }
        
        let addPersonBtn = []
        if (i >= 1) { 
            addPersonBtn.push(<AddPersonBtn handleClick={this.handleClick} /> )
        }

        return (
            <BrowserRouter>
                <div className='details'>
                    <div className='order-total'>
                    
                    <Route exact path='/' render={() => {
                        return (
                            <MealSub 
                                meal_subtotal = {this.state.meal_subtotal}
                                handleInputChange = {this.handleInputChange}
                            />
                        )
                    }} />
            

                    <Route path='/shared_items' render={() => {
                        return (
                            <SharedItems 
                                shared_items = {this.state.shared_items} 
                                handleInputChange = {this.handleInputChange}
                            />
                        )
                    }} />
            
                    <Route path='/tax' render={() => {
                        return (
                            <Tax 
                                tax = {this.state.tax} 
                                handleInputChange = {this.handleInputChange}
                            />
                        )
                    }} />
            
                    <Route path='/tip' render={() => {
                        return (
                            <Tip 
                                tip = {this.state.tip} 
                                handleInputChange = {this.handleInputChange}
                            />
                        )
                    }} />
            
                    <Route path='/grand_total' render={() => {
                        return (
                            <GrandTotal 
                                tip = {this.state.tip}
                                tax = {this.state.tax}
                                meal_subtotal = {this.state.meal_subtotal}
                                shared_items = {this.state.shared_items}
                                handleInputChange = {this.handleInputChange}
                            /> 
                        )
                    }} />

                    </div>

                    <Route exact path = {`/person/1`} render={() => {
                        return (
                            <div>
                                {addPersonBtn}
                                <Person
                                    tax = {tax}
                                    tip = {tip}
                                    shared_items = {shared_items}
                                    diners = {counter}
                                    person_num = {person_num[i]}
                                />
                                
                            </div>
                        )
                    }}/>
                    {persons}
                    {/* {links} */}
                </div>
            </BrowserRouter>
        );
    }
}

export { MealSub, SharedItems, Tax, Tip, GrandTotal, Details }
 