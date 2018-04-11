import React, { Component } from 'react';
import * as firebase from 'firebase';

class Feed extends Component{

   
    componentDidMount(){
        let content = firebase.database().ref('Activity');
        
        let activities = content.orderByChild('Time').on('value', snapshot => {
            console.log(snapshot.val())
        });

    
    }
  

    render(){
        const numbers = [1, 2, 3, 4, 5];
        const listItems = numbers.map((number, i) =>
            <li key={i}>{number}</li>
        );
        return (
            <ul>
                {listItems}
            </ul>
        );
    }
}

function snapshotToArray(snapshot) {
    var returnArr = [];

    snapshot.forEach(function(childSnapshot) {
        var item = childSnapshot.val();
        item.key = childSnapshot.key;

        returnArr.push(item);
    });

    return returnArr;
};

export default Feed;