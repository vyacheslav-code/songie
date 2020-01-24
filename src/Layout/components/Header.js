import React from 'react';

export default (props) => (
    <div className="app-header">
        <h1>Songie🎵</h1>
        <div className="user-score">
            <h2>🏆 Score: {props.score}</h2>
        </div>
    </div>
);