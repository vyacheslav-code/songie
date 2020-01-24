import React from 'react';

export default (props) => (
    <React.Fragment>
        Tracks from the game ⬇️
        {props.list ? props.list.map((song, index) => index <= props.length && (
            <div key={song.artist+song.title}>
                🎶 {song.artist} - {song.title}
            </div>
        )) : null}
    </React.Fragment>
)