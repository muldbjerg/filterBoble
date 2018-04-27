import React, { Component } from 'react';
import * as firebase from 'firebase';



class FooterLogout extends Component{
    
    constructor(){
        super();
        this.state = {
            confirmationOverlay: "",
        };
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
    logOut = () => {
        this.deleteOnFirebase();
        this.closeConfirmationOverlay();
    }

    openConfirmationOverlay =() => {
        this.setState({ confirmationOverlay: "active" })
    }

    closeConfirmationOverlay = () => {
        this.setState({ confirmationOverlay: "" })
    }


    render(){
        return (
            <div id="logout">
                <div id="logoutBtn" onClick={this.openConfirmationOverlay}>Log ud</div>

                <div id="logoutConfirmationOverlay" className={this.state.confirmationOverlay}>
                    <div id="content">
                        <h2>Vil du logge personen ud af boblen?</h2>
                        <div id="yes" onClick={this.logOut}>Log ud</div>
                        <div id="no" onClick={this.closeConfirmationOverlay}>Annuller</div>
                    </div>
                </div>
            </div>
           
        );
    }
}

export default FooterLogout;