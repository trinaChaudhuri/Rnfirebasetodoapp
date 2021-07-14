import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import firebase from "firebase/app";
import 'react-native-gesture-handler';
import * as React from 'react';
import Navi from './routes/homeStack';
import Constants from 'expo-constants';
import '@firebase/auth';
import { constant } from 'lodash';



// const firebaseConfig = {
//   apiKey: "AIzaSyDbv19TEEzws77Dx3cEidxA8yMCwZRp4dY",
//   authDomain: "reactnativetut-402e8.firebaseapp.com",
//   databaseURL: "https://reactnativetut-402e8-default-rtdb.firebaseio.com/",
//   projectId: "reactnativetut-402e8",
//   storageBucket: "reactnativetut-402e8.appspot.com",
//   messagingSenderId: "625425345497",
//   appId: "1:625425345497:web:5b738b4d41cbcc8be047c8",
//   measurementId: "G-0E4JNC99XS"
// }; firebaseConfig is now Constants.manifest.extra.firebase which is being called from app.json
 
 firebase.initializeApp(Constants.manifest.extra.firebase);

export default function App() {
  return (
    <Navi/>
  );
}




