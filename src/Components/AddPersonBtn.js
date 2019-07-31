import React from 'react';



function AddPersonBtn(props) {
    return (
        <div className='button'>
            <button className='addPerson' onClick={props.handleClick}>Add Person</button>
        </div>
    );
}

export default AddPersonBtn