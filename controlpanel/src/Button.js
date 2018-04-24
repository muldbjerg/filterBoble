import React, { Component } from 'react';
import * as firebase from 'firebase';
import "./button.css";

class Button extends Component{

    constructor(){
        super();
        this.changeContent = this.changeContent.bind(this);
    }
    
    changeContent(e) {
        e.preventDefault();
        firebase.database().ref().child('/content').set(this.props.text);
    }

    render(){
        return(
            <input type="submit" value={this.props.text} onClick={this.changeContent} />
        );
    }
}

export default Button;