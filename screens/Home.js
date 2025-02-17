import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Button,
  Modal,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Header from './header';
import firebase from 'firebase';
import moment from 'moment';

// console.log(firebase.auth().currentUser.uid);

import _ from 'lodash';


//import {ListItem} from 'react-native-elements';



const Home = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [newTask, setNewTask] = useState(' ');
  const [tasks, setTasks] = useState([]);
  const [authenticated, setAutheticated] = useState(false);

  firebase.auth().onAuthStateChanged((userauth) => {
    if (userauth) {
      setAutheticated(true);
    }
  });

  let authedUser = firebase.auth().currentUser.uid;
  let today = moment().set({'hour':12,'minute':0,'second':0,'millisecond':0}) .toString();
  // console.log(authedUser);
  // const [user, setUser] = useState();

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = () => {
    let tasksRef = firebase.database().ref('/tasks/');

    tasksRef.on('value', snapshot => {
      let val = snapshot.val();

      let valToArray = _.map(val, element => {
        return {...element};
      });
      setTasks(valToArray);
    });
  };

 

  const insertTask = () => {
    setModalVisible(false);

    let tasksRef = firebase.database().ref('/tasks/');
    let createdTask = tasksRef.push();

    let task = {id: createdTask.key, task: newTask, done: false, date: today, user: authedUser};

    createdTask
      .set(task)
      .then(res => {
        setNewTask(res);
      })
      .catch(err => console.log(err));
  };

  const pressHandler = () => {
    
    navigation.navigate('Calendar');
    // navigation.navigate('Calendar');
  }

  const pushHandler = () => {
    navigation.navigate('Contactspage');
  }

  const signoutHandler = () => {
    firebase.auth().signOut().then(() => {
       navigation.navigate('Login');
    }).catch((error) => {
      console.log("An error happened");
    });
    

  }


  const updateTask = item => {
    let taskRef = firebase.database().ref('/tasks/' + item.id);

    taskRef
      .update({done: !item.done})
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  const deleteTask = item => {
    let taskRef = firebase.database().ref('/tasks/' + item.id);

    taskRef
      .remove()
      .then()
      .catch();
  };

  const keyExtractor = (item, index) => index.toString();

  //userobj.user == autduser.id
  const Displaytasks = ({userobj}) => {
    if (userobj.user == authedUser){
      return <Text style={styles.item}>{userobj.task} </Text>
    }
     return <View />;
  }

  return (
    <View style={styles.conatainer}>
       <Header />
      <Modal visible={modalVisible}>
        <View style={styles.modal}>
          <TextInput
            style={styles.textInput}
            value={newTask}
            onChangeText={text => setNewTask(text)}
          />
          <View style={{flexDirection: 'row'}}>
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
            <Button title="Confirm" onPress={() => insertTask()} />
          </View>
        </View>
      </Modal>
      <View style={styles.listSection}>
        <FlatList
          keyExtractor={keyExtractor}
          data={tasks}
          renderItem={({item}) => 
          (
            <Displaytasks userobj = {item} /> 
          )
        }
        />

      </View>
      <View style={styles.buttonSection}>
        <Button title="Add task" onPress={() => setModalVisible(true)} />
        <Button title="go to calendar page" onPress={pressHandler}/>
        <Button title="contacts" onPress={pushHandler}/>
        <Button title="Signout" onPress={signoutHandler}/>
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  conatainer: {
    padding: 25,
    //backgroundColor: 'grey',
    flex: 1,
    backgroundColor: '#FFFFFF',

  },
  text: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
  },
  // modal: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  modal: {
    flex: 1,
    margin: 20,
    backgroundColor: "white",
    justifyContent: 'center',
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  listSection: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
  },
  buttonSection: {
    height: 150,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  textInput: {
    width: 300,
    borderWidth: 1,
    borderRadius: 20,
    height: 50,
    padding: 10,
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
export default Home;