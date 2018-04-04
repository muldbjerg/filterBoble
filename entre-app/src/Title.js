import React, { Component } from 'react';

class Title extends Component{

    render(){
        return (
            <h1>Velkommen <br/> hjem { this.props.name } </h1>
        );
    }
}

export default Title;