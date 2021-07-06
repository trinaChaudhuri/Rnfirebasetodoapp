import React, { Component, useEffect, useState } from 'react';
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
 
export default function Calendar({ route, navigation }) {
  
  // console.log(route);
  // console.log(route.params);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const startDate = selectedStartDate ? selectedStartDate.toString() : '';


  const onDateChange = (date, type) => {
      setSelectedStartDate(date);
      // console.log(date);
  };

  // console.log(selectedStartDate);

  const [tasks, setTasks] = useState([]);



  // useEffect(() => {
  //   getTasks();
  // }, []);

  useEffect(() => {
    getTasks(selectedStartDate);
    }, [selectedStartDate]);


  //method 1
  // const getTasks = () => {
  //   let tasksRef = firebase.database().ref('/tasks/');
  //   let dateRef = tasksRef.child("/tasks/" + date);
  //   or for dateRef we could do this
  //   let dateRef = tasksRef.child('/tasks/');
  //   let datequery = dateRef.equalTo(selectedStartDate);
    
  //   datequery.on('value', snapshot => {
  //     let data = snapshot.val();
  //     // console.log(val)

  //     let valToArray = _.map(data, element => {
  //       return {...element};
  //     });
  //     setTasks(valToArray);
  //   });
  // };

  //method 2
  // const getTasks = () => {
  //   let tasksRef = firebase.database().ref('/tasks/');

  //   tasksRef.orderByChild("/tasks/date").equalTo(selectedStartDate).on('value', snapshot => {
  //     let val = snapshot.val();
  //     //console.log(val)

  //     let valToArray = _.map(val, element => {
  //       return {...element};
  //     });
  //     setTasks(valToArray);
  //   });
  // };

  // method 3 , https://firebaseopensource.com/projects/jsayol/firesql/
  // const getTasks = () => {
  //   let tasksRef = firebase.database().ref("tasks");

  //   tasksRef.orderByChild("date").on('value', snapshot => {
  //     let val = snapshot.val();
  //     // let val = querysnapshot.val(selectedStartDate) ? querysnapshot.val(selectedStartDate) : {}; 
  //     // console.log(val);
      

  //     let valToArray = _.map(val, element => {
  //       return {...element};
  //     });
  //     setTasks(valToArray);

  //   });
  // };

  //working method 
  const getTasks = () => {
    let tasksRef = firebase.database().ref('/tasks/');

    tasksRef.on('value', snapshot => {
      let val = snapshot.val();
      //console.log(val)

      let valToArray = _.map(val, element => {
        return {...element};
      });
      setTasks(valToArray);
    });
  };

  const keyExtractor = (item, index) => index.toString();


  const Displaytasks = ({tasksobj}) => {
    if (tasksobj.user == 1){
      return <Text style={styles.item}>{tasksobj.task} </Text>
    }
     return <View />;
  }

  //tries to show list of taks for only the selected date..
  // const Displaytasks = ({tasksobj}) => {
  //   if (tasksobj.user == 1 && tasksobj.date == selectedStartDate){
  //     return <Text style={styles.item}>{tasksobj.task} </Text>
  //   }
  //    return <View />;
  // }


  
  // const { user, yfg } = route.params;
 
  
  


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
        {/* <Text>user: {JSON.stringify(user)}</Text>
        <Text> other param: {JSON.stringify(yfg)}</Text> */}
      </View>
      <View style={styles.listSection}>
      <FlatList
          keyExtractor={keyExtractor}
          data={tasks}
          renderItem={({item}) => 
          (
            <Displaytasks tasksobj = {item} /> 
          )
        }
        />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  listSection: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
  },
  item: {
    padding: 16,
    marginTop: 16,
    borderColor: '#bbb',
    borderWidth: 2,
    borderStyle: "dashed",
    borderRadius: 1,
    borderRadius: 10,
  }

});