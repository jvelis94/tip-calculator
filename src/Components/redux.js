import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux'
import { combineReducers } from 'redux'
import { connect } from 'react-redux'


// REDUX STATE TREE
const initialState = {
    meal: {
        meal_subtotal: 0,
        shared_items: 0,
        tax: 0,
        tip: 0,
        people: [{
            id: 1,
            item: [{
                name: '',
                price: 0
            }],
            subtotal: 0,
            total: 0
        }
        ]
    }
}

let addItem = (name, price) => {
    return {
        type: 'ADD_ITEM',
        name,
        price
    }
}

let addPerson = () => {
    return {
        type: 'ADD_PERSON',
        payload: {
        }
    }
}

let setMealSubtotal = (text) => {
    return {
        type: 'SET_MEAL_SUBTOTAL',
        text
    }
}

let setSharedItems = (text) => {
    return {
        type: 'SET_SHARED_ITEMS',
        text
    }
}

let setTax = (text) => {
    return {
        type: 'SET_TAX',
        text
    }
}

let setTip = (text) => {
    return {
        type: 'SET_TIP',
        text
    }
}


// reducer
const bill_reducer = (state=[], action) => {
    switch (action.type) {
        case 'SET_MEAL_SUBTOTAL':
            return Object.assign({}, state, {
                meal: {
                    meal_subtotal: action.text
                }
            })
        case 'SET_SHARED_ITEMS':
            return Object.assign({}, state, {
                meal: {
                    shared_items: action.text
                }
            })
        case 'SET_TAX':
            return Object.assign({}, state, {
                meal: { 
                    tax: action.text
                }
            })
        case 'SET_TIP':
            return Object.assign({}, state, {
                meal: {
                tip: action.text
                }
            })
        default:
            return state
    }    
}

const person_reducer = (state={}, action) => {
    switch (action.type) {
            case 'ADD_PERSON':
                let nextState = Object.assign({}, state)
                const person = {
                    id: action.id,
                    item: {
                        name: '',
                        price: 0
                    },
                    subtotal: 0,
                    total: 0
                }
                nextState[action.id] = person
                return nextState
            case 'ADD_ITEM':
                let nextState = Object.assign({}, state)
                const person = nextState[action.id]
                person.item.name = action.name
                person.item.price = action.price
                return nextState
            default:
                return state
    }
}

const billApp = combineReducers({
    bill: bill_reducer,
    person: person_reducer
})



const store = createStore(billApp)
console.log(store.getState())
store.dispatch(setMealSubtotal(100))
store.dispatch(addItem('beer', 10))
store.dispatch(addItem('nachos', 5))
console.log(store.getState())


const mapStateToProps = state => ({
    meal_subtotal: state.meal.meal_subtotal
})






ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
