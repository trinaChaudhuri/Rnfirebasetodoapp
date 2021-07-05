import React, { Component, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Button,
  Modal,
  TextInput,
  FlatList,
} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';
import _ from 'lodash';
import firebase from 'firebase';
//import * as React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
 
export default function Calendar({ route, navigation }) {
  
  console.log(route);
  console.log("@djdjdddde@@@@@@@@@@@@@");console.log("@djdjdddde@@@@@@@@@@@@@");
  
  //const {ItemId} = route.params;
  // const {id} = route.params;
  // const {task} = route.params;
  //console.log(route.params);
  const { user, yfg } = route.params;
 
  
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const startDate = selectedStartDate ? selectedStartDate.toString() : '';


  const onDateChange = (date, type) => {
      setSelectedStartDate(date);
  };

  return (
    <View style={styles.container}>
      <CalendarPicker
        selectedDayColor="#6B8CCE"
        selectedDayTextColor="#FFFFFF"
        todayBackgroundColor="#91afed"
        onDateChange={onDateChange}
      />
      <View>
        <Text>SELECTED START DATE:{startDate}</Text>
        <Text>user: {JSON.stringify(user)}</Text>
        <Text> other param: {JSON.stringify(yfg)}</Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});