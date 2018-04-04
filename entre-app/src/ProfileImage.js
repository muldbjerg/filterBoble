import React, { Component } from 'react';
import * as firebase from 'firebase';

class ProfileImage extends Component{

    render(){
        return (
            <div id="profilImage" style={{ backgroundImage: 'Url(' + this.props.profileImgSrc + ')' }}>
            </div>
        );
    }
}

export default ProfileImage;