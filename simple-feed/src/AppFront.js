import React, { Component } from 'react';
// import * as firebase from 'firebase';
import "./style.css";
import Feed from './Feed.js';
import * as firebase from "firebase";

class AppFront extends Component{
    constructor(){
        super();
        this.state = {
            loggedIn: false,
            name: "",
            firstname: "",
            profileImgSrc: "", //"https://scontent-arn2-1.xx.fbcdn.net/v/t31.0-8/15391382_10210111980450304_2587369804048464496_o.jpg",
            username: null
        };
        this.contentRef = firebase.database().ref('profil');
    }

    componentDidMount(){
        this.listenForActivities(this.contentRef);
    }

    // Listener to get data from firebase and update listview accordingly
    listenForActivities(contentRef) {
        contentRef.on('value', (snapshot) => {
            if(snapshot.val()){
                this.setState({
                    name: snapshot.val().name,
                    firstname: snapshot.val().firstname,
                    profileImgSrc: snapshot.val().profileImgSrc,
                    birthday: snapshot.val().birthday,
                    loggedIn: true
                });
            }
            else{
                this.setState({
                    name: "",
                    firstname: "",
                    profileImgSrc: "",
                    birthday: "",
                    loggedIn: false
                });
            }            
        });
    }


    render(){
        return (           
            <div className="wrapper">
                {this.state.loggedIn &&
                    <div> 
                        <Feed firstname={this.state.firstname} />
                    </div>
                }{ !this.state.loggedIn &&
                    <div id="">
                        <h1>Træd ind i boblen</h1>
                    </div>
                }
                
            </div>
        );
    }
}

export default AppFront;