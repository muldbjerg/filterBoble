import React, { Component } from 'react';
import * as firebase from 'firebase';
import FooterLogout from './FooterLogout.js';
import './style.css';
// import Button from './Button';

class ControlPanel extends Component{
    constructor(){
        super();
        this.state = {
            profil: "",
        };
    }

    // Kører lige efter app'en er begyndt
    componentDidMount(){
        const rootRef = firebase.database().ref();
        // const contentRef = rootRef.child('');
        rootRef.on('value', snap => {
            if(snap.val().profil){
                this.setState({
                    profil: snap.val().profil.name,
                })
            }
            else {
                this.setState({
                    profil: "Der er ingen i boblen lige nu",
                })
            }
        });
    }

    render(){
        return (
            <div className="controlContainer">
                <header>
                    <p>Filterboblens</p>
                    <h1>KONTROLPANEL</h1>
                </header>
                <p>Logget ind i boblen </p>
                <h6>{ this.state.profil }</h6>

                <FooterLogout />
            </div>
        );
    }
}

export default ControlPanel;