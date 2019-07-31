import React from 'react'

export default function Items(props){
        return (
            <div>
                <form>
                    Item<input name='item' placeholer='0' onChange={props.handleInput}></input>
                    Item Quantity<input name='item_quantity' placeholer='0' onChange={props.handleInput}></input>

                </form>
            </div>
        )
}
