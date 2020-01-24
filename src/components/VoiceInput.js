import React from 'react';
import { ReactMic } from 'react-mic';

export default (props) => (
    <div className="mic-container">
        <div className="mic-checkbox">
            <input type="checkbox" onChange={props.onCheck} value={props.Checked}/>I'm humming
        </div>
        <div className="mic-input">
            <ReactMic
                onStop={props.onStop}
                className="mic"
                record={props.record}
                strokeColor="#E18D96"
                backgroundColor="#EEEEEE"
            />
            <button
                onClick={() => {
                    props.record ? props.stop() : props.start();
                }}
            >
            {props.record ? '⏹️' : '🎙️'}
            </button>
        </div>
    </div> 
)