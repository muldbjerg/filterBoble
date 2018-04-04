import React, { Component } from 'react';
import * as firebase from 'firebase';

class LoginButton extends Component {

  componentDidMount() {
    document.addEventListener('FBObjectReady', this.initializeFacebookLogin);
  }

  componentWillUnmount() {
    document.removeEventListener('FBObjectReady', this.initializeFacebookLogin);
  }

  /**
   * Init FB object and check Facebook Login status
   */
  initializeFacebookLogin = () => {
    this.FB = window.FB;
    this.checkLoginStatus();
  }

  /**
   * Check login status
   */
  checkLoginStatus = () => {
    this.FB.getLoginStatus(this.facebookLoginHandler);
  }

  /**
   * Check login status and call login api is user is not logged in
   */
  facebookLogin = () => {
    if (!this.FB) return;

    this.FB.getLoginStatus(response => {
      if (response.status === 'connected') {
        this.facebookLoginHandler(response);
      } else {
        this.FB.login(this.facebookLoginHandler, {scope: 'public_profile'});
      }
    }, );
  }

  onFacebookLogin = (loginStatus, resultObject) => {
    
    if (loginStatus === true) {
        this.setState({
          name: resultObject.user.name,
          profileImgSrc: "https://graph.facebook.com/" + resultObject.user.id + "/picture?type=large"
        });
        
        // Send data to parent
        this.props.saveData(resultObject);
        console.log(resultObject);
    } 

  } 

  /**
   * Handle login response
   */
  facebookLoginHandler = response => {
    if (response.status === 'connected') {
      this.FB.api('/me?fields=id,first_name,name,age_range,birthday,picture.width(9999)', userData => {
        let result = {
          ...response,
          user: userData
        };
        this.onFacebookLogin(true, result);
      });

      // this.FB.api('10214336179372637/picture', 'GET', userData => {
        
      //   console.log(userData);
      // });
    } else {
      this.onFacebookLogin(false);
    }
  }

  render() {
    let {children} = this.props;
    return (
      <div id="facebookLogin" onClick={this.facebookLogin}>
        Login med Facebook
      </div>
    );
  }
}

export default LoginButton;