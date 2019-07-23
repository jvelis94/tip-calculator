import React from 'react';



function AddPerson(props) {
    return (
        <div className='button'>
            <button className='addPerson' onClick={props.onClicked}>Add Person</button>
        </div>
    );
}

export default AddPerson