import React from 'react';

export default (props) => (
    <div className="response-buttons-container">
        <button onClick={props.onGuess}>
        ✔️
        </button>
        <button onClick={props.onMismatch}>
        ❌
        </button>
    </div>
)