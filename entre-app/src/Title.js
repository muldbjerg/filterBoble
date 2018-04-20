import React from 'react';


class Title extends React.Component{

    render(){
        return (
            <h1 id="title">Velkommen <br/> hjem { this.props.name } </h1>
        );
    }
}

export default Title;