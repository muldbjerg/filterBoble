import React, { Component } from 'react';
import * as firebase from 'firebase';
import PictureSlider from './PictureSlider';
import './style.css';


class PictureFrame extends Component{

    constructor(){
        super();
        
        this.state = {
            content: "",
            pictures: []
        };

        this.images = this.importAllPictures(require.context('../', true, /\.(png|jpe?g|svg)$/));
    }

    componentDidMount(){
        this.contentRef = firebase.database().ref('Activity');
        this.contentRef.on('value', (snapshot) => {
            var activities = [];
            snapshot.forEach((child) => {
                if(child.val().Time > 0){
                    activities.push({
                        Content: child.val().Content,
                        Time: child.val().Time,
                        _key: child.key
                    });
                }
            });

            // Sorts the activities with the newest first
            activities = activities.sort(this.sortActivitiesByTime);

            
            if(activities.length > 0){
                // Find the matching pictures to the newest activtity
                this.findImagesContaining(this.images, activities['0'].Content)

                this.setState({
                    content: activities['0'].Content
                });
            }
            
        });
    }


    sortActivitiesByTime(a,b){
        return b.Time - a.Time;
    }

    importAllPictures(r){
        return r.keys().map(r);
    }

    findImagesContaining(images, contentCategory) {
        let resultArray = [];
        for (var i = 0; i < images.length; i++) {
            if (images[i].indexOf(contentCategory) !== -1){
                resultArray.push(images[i]);
            }
        }

        this.setState({
            pictures: resultArray
        });
    }
   
    render(){
        return (
            <PictureSlider pictures={this.state.pictures}  /> 
        );
    }
}

export default PictureFrame;