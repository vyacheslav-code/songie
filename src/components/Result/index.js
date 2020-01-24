import React from 'react';

import TrackInfo from './components/TrackInfo';
import PlayerLoading from './components/PlayerLoading';
import NoTrack from './components/NoTrack';
import ResponseButtons from './components/ResponseButtons'

import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

export default (props) => (
    <div className="result-container">
        <TrackInfo title={props.title} artist={props.artist} />
            {
                props.loading ?
                    <PlayerLoading /> 
                :
                    props.noTrack ?
                        <NoTrack />
                    :
                        <AudioPlayer
                            showLoopControl={false}
                            showJumpControls={false}
                            src={props.track}
                        />            
            }
        <ResponseButtons
            onGuess={props.onGuess}
            onMismatch={props.onMismatch}
        />        
    </div> 
)