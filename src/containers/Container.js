import React from 'react';

import { searchTrack, searchTrackByLyrics, getAudio } from '../data/api';

import ModeSwitch from '../components/ModeSwitch';
import VoiceInput from '../components/VoiceInput';
import TextInput from '../components/TextInput';
import Submit from '../components/Submit';
import Result from '../components/Result';
import GameOver from '../components/GameOver';
import Searching from '../components/Searching';
import Layout from '../Layout';
import ErrorPlaceholder from '../components/ErrorPlaceholder';


export default class extends React.Component {

    state = {
        byVoice: false,
        value: '',
        songList: [],
        record: false,
        file: null,
        previewUrl: '',
        title: '',
        artist: '',
        input: true,
        tryCount: 0,
        noTrack: false,
        userVictory: false,
        userLost: false,
        humMode: false,
        searching: false,
        loading: false,
        score: 0,
        error: false
    };

    startRecording = () => {
        this.setState({
          record: true
        });
    }
     
    stopRecording = () => {
        this.setState({
          record: false
        });
    }
     
    onStop = (recordedBlob) => {
        let theBlob = recordedBlob.blob;
        theBlob.lastModifiedDate = new Date();
        theBlob.name = 'audio';
        this.setState( { file: theBlob });
    }

    handleSendRequest = () => {
        this.setState({ 
            input: false,
            searching: true
        });
        if (this.state.byVoice) {
            const data = new FormData();
            data.append('file', this.state.file, this.state.file.name);
            searchTrack(this.state.humMode, data)
            .then(r => this.parseResults(r, this.state.humMode))
            .catch(this.handleErrors);
        } else {
            searchTrackByLyrics(this.state.value)
            .then(r => this.parseResults(r, true))
            .catch(this.handleErrors);
        }   
    };

    parseResults = (r, hum) => {
        const songList = r.data.result;
        if (songList === null) {
            this.handleUserWon();
            this.setState({
                searching: false
            });
        } else {
            this.setState({
                songList: hum ? songList : [songList],
                searching: false
            }, () => {
                this.handlePropose();
            })
        }
    }

    handleErrors = e => {
        this.setState({ error: true });
    }

    handleRestartAfterError = () => {
        this.setState({ error: false, searching: false });
        this.handleReset();
    }

    handleGetMusic = (title, artist) => {
        this.setState({
            loading: true
        });
        getAudio(title, artist)
        .then(r => {
            if (r.data.data.length !== 0) {
                this.setState({
                    noTrack: false, 
                    previewUrl: r.data.data[0].preview,
                    loading: false
                })
            } else {
                this.setState({ 
                    noTrack: true, 
                    loading: false 
                })        
            }
        })
        .catch(this.handleErrors);
    }

    handlePropose = () => {
        const { songList, tryCount } = this.state;
        if (!songList || !songList[tryCount]) {
            this.handleUserWon();
        } else {
            const { title, artist } = songList[tryCount];
            this.setState({ title, artist });
            this.handleGetMusic(title, artist);
        }
    }

    handleInputChange = (e) => {
        this.setState({ value: e.target.value });
    };

    handleYes = () => {
        this.setState({
            userLost: true
        });
    }

    handleNo = () => {
        const { tryCount } = this.state;
        if ( tryCount === 4) {
            this.handleUserWon();
        } else {
            this.setState({
                tryCount: tryCount + 1
            }, () => {
                this.handlePropose();
            })
        }
    }

    handleReset = () => {
        this.setState({
            userVictory: false,
            userLost: false,
            input: true,
            file: null,
            value: '',
            tryCount: 0
        });
    }

    handleHum = (e) => {
        this.setState({ humMode: e.target.checked });
    }

    handleUserWon = () => {
        this.setState({
            userVictory: true,
            score: this.state.score + 1
        });
    }

    handleModeChange = () => {
        this.setState({
            byVoice: !this.state.byVoice
        });
    }

    render() {
        const { byVoice, input } = this.state;

        if (this.state.error) {
            return (
                <Layout score={this.state.score}>
                    <ErrorPlaceholder onClick={this.handleRestartAfterError} />
                </Layout>  
            )
        }

        if (this.state.userVictory) {
            return (
                <Layout score={this.state.score}>
                    <GameOver
                        victory
                        length={this.state.tryCount}
                        list={this.state.songList}
                        onReset={this.handleReset}
                    />
                </Layout>    
            )
        }

        if (this.state.userLost) {
            return (
                <Layout score={this.state.score}>
                    <GameOver
                        length={this.state.tryCount}
                        list={this.state.songList}
                        onReset={this.handleReset}
                    />
                </Layout>  
            )
        }

        return (
        <Layout score={this.state.score}>
            {
                this.state.searching ?
                <Searching />
                :
                <React.Fragment>
                    <ModeSwitch onChange={this.handleModeChange} />
                    {
                    input ?
                        <React.Fragment>
                        {byVoice ?
                                <VoiceInput
                                    onStop={this.onStop}
                                    onCheck={this.handleHum}
                                    checked={this.state.humMode}
                                    record={this.state.record}
                                    stop={this.stopRecording}
                                    start={this.startRecording}
                                />
                            :
                                <TextInput
                                    value={this.state.value}
                                    onChange={this.handleInputChange}
                                />    
                            }
                            <Submit
                                disabled={!this.state.file && !this.state.value}
                                onSubmit={this.handleSendRequest}
                            />      
                        </React.Fragment>
                    :   
                        <Result
                            title={this.state.title}
                            artist={this.state.artist}
                            track={this.state.previewUrl}
                            loading={this.state.loading}
                            noTrack={this.state.noTrack}
                            onGuess={this.handleYes}
                            onMismatch={this.handleNo}
                        />           
                    }
                </React.Fragment>
            } 
        </Layout>
        );
    }
}