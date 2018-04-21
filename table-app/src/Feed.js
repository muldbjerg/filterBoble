import React, { Component } from 'react';
import * as firebase from 'firebase';
import Activity from './Activity.js';

class Feed extends Component{

    constructor(){
        super();
        this.contentRef = firebase.database().ref('Activity');
    }

    state = {
        activitiesList: [],
        loading: true
    };

    componentDidMount(){
        this.listenForActivities(this.contentRef);
    }

    // Listener to get data from firebase and update listview accordingly
    listenForActivities(contentRef) {
        contentRef.on('value', (snapshot) => {
            var activities = [];
            snapshot.forEach((child) => {
                if(child.val().Time > 0){
                    activities.push({
                        Content: child.val().Content,
                        ContentTekst: child.val().ContentTekst,
                        Firstname: this.props.firstname,
                        Time: child.val().Time,
                        _key: child.key
                    });
                }
            });

            // Sorts the activities and sets state
            this.setState({
                activitiesList: activities.sort(this.sortActivitiesByTime),
                loading: false
            });
        });
    }

    sortActivitiesByTime(a,b){
        return b.Time - a.Time;
    }

    render(){
        return (
            <div id="feed">
                <h6>Feed</h6>
                <Activity activities={this.state.activitiesList} loading={this.state.loading} ></Activity>
            </div>
        );
    }
}
export default Feed;