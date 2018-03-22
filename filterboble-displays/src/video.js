import React, { Component } from 'react';
import * as firebase from 'firebase';
import "./video.css";


class Video extends Component{

    constructor(){
        super();
        
        this.state = {
            content: "",
            videoSrc: "https://www.youtube.com/embed/tgbNymZ7vqY"
        };
    }

    componentDidMount(){
        let newVideoSrc = this.state.videoSrc;
        const rootRef = firebase.database().ref();
        const contentRef = rootRef.child('content');
        contentRef.on('value', snap => {
            
            console.log(snap.val());
            if(snap.val() == "Baby"){
                newVideoSrc = "https://www.youtube.com/embed/9hGa3w52RjM";
            }
            else if(snap.val() == "Uddannelse"){
                newVideoSrc = "https://www.youtube.com/embed/FiWsKJ-iYyo";
            }
            else if(snap.val() == "Hus"){
                newVideoSrc = "https://www.youtube.com/embed/BQjBrt9LriY";
            }

            this.setState({
                content: snap.val(),
                videoSrc: newVideoSrc
            });
        });
    }

    render(){
        return(
            <div>
                <iframe id="myVideo" width="420" height="345" src={this.state.videoSrc + "?rel=0&amp;controls=0&amp;showinfo=0;autoplay=1"} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen />
                <div>{this.props.filter}</div>
                <div>{this.state.videoSrc}</div>
            </div>
        );
    }
}

export default Video; 