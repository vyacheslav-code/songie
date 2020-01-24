import React from 'react';

export default (props) => (
    <div className="submit-container">
        <button className="submit-btn" disabled={props.disabled} onClick={props.onSubmit}>
            Let's play 😏
        </button>
    </div>   
)