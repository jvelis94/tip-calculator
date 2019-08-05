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
            <label htmlFor='meal_subtotal'>What was the bill total <small>(before tax and tip)?</small></label><br></br>
            <input name='meal_subtotal' placeholder={`$${props.meal_subtotal}`} onChange={props.handleInputChange   }></input><br></br>
            <div className='links' style={{float: 'right'}}>
                <button><Link to='/shared_items'>Next</Link></button>
            </div>
        </form>
        )
}

function SharedItems(props) {
    return (
        <form>
            <label htmlFor='shared_items'>If you shared any items, what was the total of all those items?</label><br></br>
            <input name='shared_items' placeholder={`$${props.shared_items}`} onChange={props.handleInputChange}></input><br></br>
            <div className='links'>
                <button><Link to='/'>Back</Link></button>
                <button><Link to='/tax'>Next</Link></button>
            </div>
        </form>
    )
}

function Tax(props) {
    return (
        <form>    
            <label htmlFor='tax'>Tax:</label><br></br>
            <input name='tax' placeholder={`$${props.tax}`} onChange={props.handleInputChange}></input><br></br>
            <div className='links'>
                <button><Link to='/shared_items'>Back</Link></button>
                <button><Link to='/tip'>Next</Link></button>
            </div>
        </form>
    )
}

function Tip(props) {
    return (
        <form>
            <label htmlFor='tip'>How much are you tipping your server?</label><br></br>
            <input name='tip' placeholder={`%${props.tip}`} onChange={props.handleInputChange}></input><br></br>
            <div className='links'>
                <button><Link to='/tax'>Back</Link></button>
                <button><Link to='/grand_total'>Next</Link></button>
            </div>
        </form>
    )
}

function GrandTotal(props) {
    let grand_total = parseFloat(props.meal_subtotal) + (parseFloat(props.tax)) + ((parseFloat(props.meal_subtotal)) * (parseFloat(props.tip)/100));
    return (
        <form>
            <label htmlFor='total'>The table's grand total is:</label><br></br>
            <input name='total' value={`$${grand_total.toFixed(2)}`} readOnly></input><br></br>
            <section style={{marginBottom: '20px'}}>Now lets add people to split this with</section>
            <div className='links'>
                <button><Link to='/tip'>Back</Link></button>
                <button><Link to='/person/1'>Add People</Link></button>
            </div>
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
        const {counter, tax, tip, shared_items, person_num, meal_subtotal} = this.state
        let persons = []
        let links = []
        let i = 1;
        while (i < counter) {
            persons.push(
                        <Person
                            meal_subtotal = {meal_subtotal}
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
                                <Person
                                    meal_subtotal = {meal_subtotal}
                                    tax = {tax}
                                    tip = {tip}
                                    shared_items = {shared_items}
                                    diners = {counter}
                                    person_num = {person_num[i]}
                                />
                                {persons}
                                {addPersonBtn}
                            </div>
                        )
                    }}/>
                    
                    {/* {links} */}
                </div>
            </BrowserRouter>
        );
    }
}

export { MealSub, SharedItems, Tax, Tip, GrandTotal, Details }
 