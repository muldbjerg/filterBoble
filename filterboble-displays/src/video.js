import React, { Component } from 'react';
import * as firebase from 'firebase';
import "./video.css";


class Video extends Component{

    constructor(){
        super();
        
        this.state = {
            status: false,
            content: "",
            videoSrc: "https://www.youtube.com/embed/tgbNymZ7vqY"
        };
    }

    componentDidMount(){
        let newVideoSrc = this.state.videoSrc;
        this.contentRef = firebase.database().ref('Activity');
        this.activeStatus = firebase.database().ref('BobleActive').child('Active');
        
        this.activeStatus.on('value', (snap) => {
            this.setState({
                status: snap.val()
            })

            if(!this.state.status){
                this.setState({
                    activitiesList: "",
                    content: "",
                    videoSrc: ""
                });
            }
        });

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

            if(activities.length > 0 && this.state.status){
                newVideoSrc = "/video/" + activities['0'].Content + ".mp4";
        
                this.setState({
                    activitiesList: activities.sort(this.sortActivitiesByTime),
                    content: snapshot.val(),
                    videoSrc: newVideoSrc
                });
            }
            else{
                this.setState({
                    activitiesList: "",
                    content: "",
                    videoSrc: ""
                });
            }
            
        });
    }

    sortActivitiesByTime(a,b){
        return b.Time - a.Time;
    }

    render(){
        return(
            <div>
                <video id="myVideo" name="media" src={ this.state.videoSrc } type="video/mp4" loop autoPlay />
            </div>
        );
    }
}

export default Video; 