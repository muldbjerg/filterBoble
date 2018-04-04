import React, { Component } from 'react';

class FooterLogout extends Component{


    render(){
        return (
            <footer id="logout">
                <div id="logoutBtn" onClick={this.logout}>Log ud</div>
                <p>Læs mere om projektet</p> 
            </footer>
           
        );
    }
}

export default FooterLogout;