import React, { Component } from 'react';
import * as firebase from 'firebase';

class LoginButton extends Component {

  componentDidMount() {
    document.addEventListener('FBObjectReady', this.initializeFacebookLogin);
  }

  componentWillUnmount() {
    document.removeEventListener('FBObjectReady', this.initializeFacebookLogin);
  }

  // Init FB object and check Facebook Login status
  initializeFacebookLogin = () => {
    this.FB = window.FB;
    this.checkLoginStatus();
  }

  // Check login status
  checkLoginStatus = () => {
    this.FB.getLoginStatus(this.facebookLoginHandler);
  }

  // Handle login response
  facebookLoginHandler = response => {
    if (response.status === 'connected') {
      this.FB.api('/me?fields=id,first_name,name,picture.width(9999)', userData => {
        let result = {
          ...response,
          user: userData
        };
        this.onFacebookLogin(true, result);
      });
    } else {
      this.onFacebookLogin(false);
    }
  }

  // Check login status and call login api is user is not logged in
  facebookLogin = () => {
    if (this.FB){
      this.FB.getLoginStatus(response => {
        if (response.status === 'connected') {
          this.facebookLoginHandler(response);
        } else {
          this.FB.login(this.facebookLoginHandler, {scope: 'public_profile'});
        }
      }, );
    } 
  }

  // Set state when logged in
  onFacebookLogin = (loginStatus, resultObject) => {
    if (loginStatus === true) {
        this.setState({
          name: resultObject.user.name,
          // profileImgSrc: "https://graph.facebook.com/" + resultObject.user.id + "/picture?type=large"
        });

        // Reset firebase
        this.resetFirebase();
        
        // Send data to parent
        this.props.saveData(resultObject);

        // Save data to firebase
        this.saveDataToFirebase(resultObject);

        // Set boble to active
        firebase.database().ref('/BobleActive').child('/Active').set(true);
    } 
  } 

  // Delete time from 
  resetFirebase = () => {
    firebase.database().ref('/Activity/').once('value', (snapshot) => {
      snapshot.forEach((child) => {
          var path = child.val().Content + 'Item';
          firebase.database().ref("Activity").child(path).child('Time').set(0);
      });
  });
  }

  saveDataToFirebase = (resultObject) => {
    firebase.database().ref().child('/profil/firstname').set(resultObject.user.first_name);
    firebase.database().ref().child('/profil/name').set(resultObject.user.name);
    firebase.database().ref().child('/profil/profileImgSrc').set(resultObject.user.picture.data.url);
  }

  render() {
    return (
      <div id="facebookLogin" onClick={this.facebookLogin}>
        Login med Facebook
      </div>
    );
  }
}

export default LoginButton;