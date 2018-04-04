import React, { Component } from 'react';
// import * as firebase from 'firebase';
import "./style.css";
import Title from './Title.js';
import ProfileImage from './ProfileImage.js';
import LoginButton from './LoginButton.js';
import Feed from './Feed.js';
import FooterDescription from './FooterDescription.js';
import FooterLogout from './FooterLogout.js';

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

    getData = (val) => {
        this.setState({
            name: val.user.name,
            first_name: val.user.first_name,
            profileImgSrc: val.user.picture.data.url,
            loggedIn: true,
        });
    }

    logout = (msg) => {
        if(msg === "error"){
            alert("Fejl opstået ved udlogning - kontakt administratorerne");
        }

        this.setState({
            name: "",
            first_name: "",
            profileImgSrc: "",
            loggedIn: false,
        });
    }
    
    render(){
        return (           
            <div className="wrapper">
                <ProfileImage profileImgSrc={ this.state.profileImgSrc } />
                <Title name={ this.state.first_name } />
                {this.state.loggedIn &&
                    <Feed />
                }{ !this.state.loggedIn &&
                    <LoginButton saveData={ this.getData } />
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