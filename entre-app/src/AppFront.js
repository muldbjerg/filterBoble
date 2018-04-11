import React, { Component } from 'react';
// import * as firebase from 'firebase';
import "./style.css";
import Title from './Title.js';
import ProfileImage from './ProfileImage.js';
import LoginButton from './LoginButton.js';
import Feed from './Feed.js';
import FooterDescription from './FooterDescription.js';
import FooterLogout from './FooterLogout.js';
import {TweenMax} from "gsap";

class AppFront extends Component{
    constructor(){
        super();
        this.state = {
            loggedIn: false,
            name: "",
            profileImgSrc: "", //"https://scontent-arn2-1.xx.fbcdn.net/v/t31.0-8/15391382_10210111980450304_2587369804048464496_o.jpg",
            username: null
        };
    }

    saveData = (val) => {
        // When logging in - title gets pushed down
        TweenMax.to("#title", 1, { marginTop: 340 });
        TweenMax.from("#profilImage", 1, { height: 0 });
        
        this.setState({
            name: val.user.name,
            first_name: val.user.first_name,
            profileImgSrc: val.user.picture.data.url,
            loggedIn: true,
        });

        setTimeout(() => {
            TweenMax.to("#title", 1, { marginTop: 100 });
            TweenMax.to("#profilImage", 1, { height: 150 });
        }, 4000);      
    }

    logout = (msg) => {
        if(msg === "error"){
            alert("Fejl opstået ved udlogning - kontakt administratorerne");
        }

        TweenMax.to("#title", 1, { marginTop: 0 });
        TweenMax.to("#profilImage", 1, { height: 0});

        setTimeout(() => {
            this.setState({
                name: "",
                first_name: "",
                profileImgSrc: "",
                loggedIn: false,
            });
        }, 1000);        
    }

    render(){
        return (           
            <div className="wrapper">
                <ProfileImage profileImgSrc={ this.state.profileImgSrc } />
                <Title name={ this.state.first_name } />
                {this.state.loggedIn &&
                    <Feed />
                }{ !this.state.loggedIn &&
                    <LoginButton saveData={ this.saveData } />
                }

                { !this.state.loggedIn &&
                    <FooterDescription />
                }{ this.state.loggedIn &&
                    <FooterLogout logout={ this.logout } />
                }
            </div>
        );
    }
}

export default AppFront;