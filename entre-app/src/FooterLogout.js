import React, { Component } from 'react';
import * as firebase from 'firebase';

class FooterLogout extends Component{

    componentDidMount() {
        this.initializeFacebookLogin();
    }

    // Init FB object and check Facebook Login status
    initializeFacebookLogin = () => {
        this.FB = window.FB;
    }

    // Delete Facebook Permissions
    deleteFacebookPermissions = () => {
        this.FB.api( "/me/permissions", "DELETE", response => {
            console.log(response);
            if(!response.success){
                this.props.logout("error");
            }
        });
    }

    // Log Facebook out
    logFacebookOut = () => {
        // console.log(this.FB.getLoginStatus());
        if(this.FB){
            this.props.logout();
            this.deleteFacebookPermissions();
            this.FB.logout();
            firebase.database().ref().child('/profil').remove();
            this.initializeFacebookLogin();
        }
        // console.log(this.FB.getLoginStatus());
    }

    render(){
        return (
            <footer id="logout">
                <div id="logoutBtn" onClick={this.logFacebookOut}>Log ud</div>
                <p>Læs mere om projektet</p> 
            </footer>
           
        );
    }
}

export default FooterLogout;