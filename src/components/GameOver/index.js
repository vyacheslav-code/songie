import React from 'react';
import SongList from './components/SongList'

export default (props) => (
    <div className="gameover-container">
        {props.victory ? '🥳Congratulations, you tricked AI!' : '😓I\'m sorry. Better luck next time!'}
        <br/>
        <SongList list={props.list} length={props.length}/>
        <button onClick={props.onReset}>
            Play again
        </button>
    </div>
)