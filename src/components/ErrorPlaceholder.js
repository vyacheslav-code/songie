import React from 'react';

export default (props) => (
    <div className="error-container">
        Whoops. An error ocured.
        <button onClick={props.onClick}>
            Home
        </button>
    </div>
)