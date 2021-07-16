import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  PermissionsAndroid
} from 'react-native';
import * as Contacts from 'expo-contacts';
import * as Permissions from 'expo-permissions';
import Expo from 'expo';
import firebase from 'firebase/firestore'

export default class Contactspage extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      contacts: [],
      tabSelected:'people'
    };
  }

  loadContacts = async () => {
    const permission = await Permissions.askAsync(
      Permissions.CONTACTS
    );

    if (permission.status !== 'granted') {
      return;
    }

    const { data } = await Contacts.getContactsAsync({
      fields: [Contacts.Fields.PhoneNumbers, Contacts.Fields.Emails]
    });

    //console.log(data);
    this.setState({ contacts: data, inMemoryContacts: data, isLoading: false });
  };

  componentDidMount() {
    this.setState({ isLoading: true });
    this.loadContacts();
    async function getMarker() {
      const snapshot = await firebase.firestore().collection('users').get()
      return snapshot.docs.map(doc => doc.data());
    }
    getMarker();
  }
  
  renderItem = ({ item,index }) => (   
    <View style={{ minHeight: 25 }}>
      <Text style={index%2==0?{backgroundColor:'#ECF4F7',fontSize:14,padding:15}:{backgroundColor:'white',fontSize:14,padding:15}}>
        {item.firstName + ' '}
        {item.lastName}
      </Text>
      {/* {console.log('item',item)} */}
      {/* <Text style={{ color: '#000000'}}>
        {item.phoneNumbers[0].digits}
      </Text> */}
    </View>
  );

  searchContacts = value => {
    const filteredContacts = this.state.inMemoryContacts.filter(contact => {
      let contactLowercase = (
        contact.firstName +
        ' ' +
        contact.lastName
      ).toLowerCase();

      let searchTermLowercase = value.toLowerCase();
      return contactLowercase.indexOf(searchTermLowercase) > -1;
    });
    this.setState({ contacts: filteredContacts });
  };
  
  // async function findFriendByNumber({ number, user }: PhoneNumber) {
  //   console.log(`Checking for ${number}...`);
  //   try {
  //     const userRecord = await admin.auth().getUserByPhoneNumber(number);
  //     const { displayName, uid } = userRecord;
  
  //     return Promise.resolve({
  //       number,
  //       user: {
  //         displayName,
  //         number,
  //         uid,
  //       },
  //     });
  //   } catch (error) {
  //     if (error.code !== "auth/user-not-found") {
  //       console.log(error);
  //     }
  //     return Promise.resolve({ number, user });
  //   }
  // }
  

  



  render() {
    return (
      <SafeAreaView >
        <Text style={{fontSize:22,color:'black',marginTop:40}}>Back</Text>
        <View style={{padding:10}}>
        <TextInput
           placeholder="Search People to invite"
           placeholderTextColor="#414142"
           style={{
             backgroundColor: '#FFFFFF',
             height: 50,
             fontSize: 21,
             color: 'black',
             borderTopWidth:2,
             borderLeftWidth:2,
             borderRightWidth:2,
             borderBottomWidth:5,
             borderRadius:16,
             padding:10
           }}
           onChangeText={value => this.searchContacts(value)}
         />
         </View>
         <View style={{flexDirection:'row'}}>
           <TouchableOpacity style={this.state.tabSelected=='people'?{width:'50%',height:52,borderBottomColor:'black',justifyContent:'center',alignItems:'center',borderBottomWidth:5}:{width:'50%',height:42,justifyContent:'center',alignItems:'center'}} onPress={()=>{
             this.setState({tabSelected:'people'})
           }}>
           <Text style={{textAlign:'center',fontSize:14}}>People</Text>
           </TouchableOpacity>
           <TouchableOpacity style={{width:'50%',height:52,justifyContent:'center',alignItems:'center'}}>
           <Text style={{textAlign:'center',fontSize:14}}>Invites Recieved</Text>
           </TouchableOpacity>
         </View>
           <View style={{  backgroundColor: '#FFFFFF' }}>
          {this.state.isLoading ? (
             <View
               style={{
                 ...StyleSheet.absoluteFill,
                 alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <ActivityIndicator size="large" color="#bad555" />
            </View>
          ) : null}
          <FlatList
            data={this.state.contacts}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={() => (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 50
                }}
              >
                <Text style={{ color: '#bad555' }}>No Contacts Found</Text>
              </View>
            )}
          />
          </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});



// <SafeAreaView style={{ flex: 1 }}>
      //   <View style={{ backgroundColor: '#FFFFFF'}} />
      //   <Text>Back</Text>
      //   <TextInput
      //     placeholder="Search People"
      //     placeholderTextColor="#414142"
      //     style={{
      //       backgroundColor: '#FFFFFF',
      //       height: 50,
      //       fontSize: 28,
      //       color: 'black',
      //       borderBottomWidth: 2,
      //       borderBottomColor: '#000000'
      //     }}
      //     onChangeText={value => this.searchContacts(value)}
      //   />
      //   <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      //     {this.state.isLoading ? (
      //       <View
      //         style={{
      //           ...StyleSheet.absoluteFill,
      //           alignItems: 'center',
      //           justifyContent: 'center'
      //         }}
      //       >
      //         <ActivityIndicator size="large" color="#bad555" />
      //       </View>
      //     ) : null}
      //     <FlatList
      //       data={this.state.contacts}
      //       renderItem={this.renderItem}
      //       keyExtractor={(item, index) => index.toString()}
      //       ListEmptyComponent={() => (
      //         <View
      //           style={{
      //             flex: 1,
      //             alignItems: 'center',
      //             justifyContent: 'center',
      //             marginTop: 50
      //           }}
      //         >
      //           <Text style={{ color: '#bad555' }}>No Contacts Found</Text>
      //         </View>
      //       )}
      //     />
      //   </View>
      // </SafeAreaView>