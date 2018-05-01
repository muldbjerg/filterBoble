import React, { Component } from 'react';
import * as firebase from 'firebase';
import Video from './video';

class FilterbobleDisplays extends Component{
    constructor(){
        super();
        this.state = {
            content: ""
        };
    }

    // Kører lige efter app'en er begyndt
    componentDidMount(){
        const rootRef = firebase.database().ref();
        const contentRef = rootRef.child('content');
        contentRef.on('value', snap => {
            if(snap.val()){
                this.setState({
                    content: snap.val()
                });
            };
            
        });
    }

    render(){
        return (
            <Video filter={ this.state.content } /> 
        );
    }
}

export default FilterbobleDisplays;