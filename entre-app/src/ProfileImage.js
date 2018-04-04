import React, { Component } from 'react';

class ProfileImage extends Component{

    render(){
        return (
            <div id="profilImage" style={{ backgroundImage: 'Url(' + this.props.profileImgSrc + ')' }}>
            </div>
        );
    }
}

export default ProfileImage;