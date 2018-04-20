import React, { Component } from 'react';

class ProfileImage extends Component{

    render(){
        return (
            <div>
                <div id="profilImageOverlay"></div>
                <div id="profilImage" style={{ backgroundImage: 'Url(' + this.props.profileImgSrc + ')' }}>
                </div>
            </div>
        );
    }
}

export default ProfileImage;