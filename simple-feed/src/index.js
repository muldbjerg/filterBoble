import React from 'react';
import ReactDOM from 'react-dom';
import * as firebase from 'firebase';
import AppFront from './AppFront.js'

var config = {
    apiKey: "AIzaSyDR08uVJ5lt5lMzLQLvtc-w0OSOpUR5MK4",
    authDomain: "filterboble.firebaseapp.com",
    databaseURL: "https://filterboble.firebaseio.com",
    projectId: "filterboble",
    storageBucket: "filterboble.appspot.com",
    messagingSenderId: "10781850273"
};

firebase.initializeApp(config); 

ReactDOM.render(
    <AppFront/>,
    document.getElementById('root')

);