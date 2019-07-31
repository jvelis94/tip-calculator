import React from 'react'

export default function Items(props){
        return (
            <div>
                <form id='items-form'>
                    <label>Item price: </label>
                    <input name='item' placeholer='0' onChange={props.handleInput}></input>
                    <label id='qty-label'>Qty: </label>
                    <input name='item_quantity' id='qty-input' placeholer='0' onChange={props.handleInput}></input>

                </form>
            </div>
        )
}
