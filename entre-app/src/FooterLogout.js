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

    // Delete what was saved on Firebase
    deleteOnFirebase = () =>{
        firebase.database().ref().child('/profil').remove();
        firebase.database().ref('/BobleActive').child('/Active').set(false);

        firebase.database().ref('/Activity/').once('value', (snapshot) => {
            snapshot.forEach((child) => {
                var path = child.val().Content + 'Item';
                firebase.database().ref("Activity").child(path).child('Time').set(0);
            });
        });
    }

    // Log Facebook out
    logFacebookOut = () => {
        if(this.FB){
            this.props.logout();
            this.deleteFacebookPermissions();
            this.FB.logout();
            this.deleteOnFirebase();
            this.initializeFacebookLogin();
        }
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