import React from 'react';

export default (props) => (
    <div className="mode-container">
        <button className="mode-btn" onClick={props.onChange}>Mode 🔄</button>
    </div>
);