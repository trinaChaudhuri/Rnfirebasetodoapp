import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';


import * as firebase from 'firebase';

export default LoadingScreen = ({ navigation }) => {
  useEffect(() => {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    firebase.auth().onAuthStateChanged(currentUser => {
      if (currentUser) {
        navigation.navigate('Home');
      } else {
        navigation.navigate('Login');
      }
    });
  }, []);

  return (
        <View >
          <ActivityIndicator size='large' />
        </View>
      );
};

