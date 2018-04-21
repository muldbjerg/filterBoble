import React, { Component } from 'react';
// import * as firebase from 'firebase';
import "./style.css";
import Feed from './Feed.js';
import Sidebar from './Sidebar.js';
import * as firebase from "firebase";

class AppFront extends Component{
    constructor(){
        super();
        this.state = {
            loggedIn: false,
            name: "",
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
                    profileImgSrc: snapshot.val().profileImgSrc,
                    birthday: snapshot.val().birthday,
                    loggedIn: true
                });
            }
            else{
                this.setState({
                    name: "",
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
                        <Sidebar name={this.state.name} profileImgSrc={this.state.profileImgSrc} birthday={this.state.birthday} /> 
                        <Feed />
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