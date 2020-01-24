import axios from 'axios';

const API_TOKEN = 'b1c566aed195173f8e879538b0ea890f';

export const searchTrack = (hum, data) => axios.post(`http://cors-anywhere.herokuapp.com/https://api.audd.io/${hum ? 'recognizeWithOffset' : ''}`, data);

export const searchTrackByLyrics = (q) => axios.get(`https://api.audd.io/findLyrics/`, {
    params: {
        api_token: API_TOKEN,
        q
    }
});

export const getAudio = (title,artist) => axios.get(`http://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=title:"${title}",artist:"${artist}"`);