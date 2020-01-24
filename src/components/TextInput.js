import React from 'react';

export default (props) => (
    <input 
        className="text-input"
        type="text" 
        value={props.value} 
        onChange={props.onChange}
        placeholder="Type lyrics here"
    />
)