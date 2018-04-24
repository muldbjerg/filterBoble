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
        this.contentRef = firebase.database().ref('Activity');
        this.contentRef.on('value', (snapshot) => {
            var activities = [];
            snapshot.forEach((child) => {
                if(child.val().Time > 0){
                    activities.push({
                        ContentTekst: child.val().ContentTekst,
                        Content: child.val().Content,
                        Firstname: this.props.firstname,
                        Time: child.val().Time,
                        _key: child.key
                    });
                }
            });

            activities = activities.sort(this.sortActivitiesByTime);

            for(let i = 0; i < 1; i++){
                newVideoSrc = "/video/" + activities[i].Content + ".mp4";
            }


            this.setState({
                activitiesList: activities.sort(this.sortActivitiesByTime),
                content: snapshot.val(),
                videoSrc: newVideoSrc
            });
        });
    }

    sortActivitiesByTime(a,b){
        return b.Time - a.Time;
    }

    render(){
        return(
            <div>
                <video id="myVideo" autoplay="" name="media"  src={ this.state.videoSrc } type="video/mp4" loop />
            </div>
        );
    }
}

export default Video; 