import React from 'react';
import Header from './components/Header'
import Footer from './components/Footer'

export default (props) => (
    <div className="app-container">
        <Header score={props.score} />
        {props.children}
        <Footer />
    </div>    
)