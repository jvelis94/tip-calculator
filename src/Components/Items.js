import React from 'react'

export default function Items(props){
    let item_total = parseFloat(props.item) * parseFloat(props.item_quantity)
        return (
            <div>
                <form>
                    Item<input name='item' placeholer='0' onChange={props.handleInput}></input>
                    Item Quantity<input name='item_quantity' placeholer='0' onChange={props.handleInput}></input>
                    <p style={{display: 'inline'}}>Item Total: ${item_total}</p>
                </form>
                
            </div>
        )
}
