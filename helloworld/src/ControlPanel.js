import React, { Component } from 'react';
import * as firebase from 'firebase';
import Button from './Button';

class ControlPanel extends Component{
    constructor(){
        super();
        this.state = {
            content: "hallo"
        };
    }

    // Kører lige efter app'en er begyndt
    componentDidMount(){
        const rootRef = firebase.database().ref();
        const contentRef = rootRef.child('content');
        contentRef.on('value', snap => {
            this.setState({
                content: snap.val()
            });
        });
    }

    render(){
        return (
            <div className="helloContainer">
                <h1>Filterboblen's kontrolpanel</h1>
                <p>Viser lige nu: { this.state.content }</p>
                <Button text="Baby" />
                <Button text="Uddannelse" />
                <Button text="Hus" />
            </div>
        );
    }
}

export default ControlPanel;