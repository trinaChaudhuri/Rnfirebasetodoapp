import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  PermissionsAndroid,
} from 'react-native';
import { TouchableOpacity } from "react-native";
import * as Contacts from 'expo-contacts';
import * as Permissions from 'expo-permissions';
import Expo from 'expo';


export default class Contactspage extends React.Component {
  constructor({navigation}) {
    super();
    this.state = {
      isLoading: false,
      contacts: []
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
  }

  
  ContactPress = () => {
    navigation.navigate('Meetscd');
  }


  renderItem = ({ item }) => (
    <View style={{ minHeight: 20, padding: 2 }}>
      <TouchableOpacity onPress={this.ContactPress}>
      <Text style={{ color: '#000000', fontWeight: 'bold',backgroundColor: '#ECF4F7', fontSize: 24, padding: 20, marginVertical: 8, marginHorizontal: 16 }}>
        {item.firstName + ' '}
        {item.lastName}
      </Text>
      </TouchableOpacity>
      <Text style={{ color: '#000000'}}>
        {item.phoneNumbers[0].digits}
      </Text>
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

  render() {
    return (
      <View style={{ flex: 1 }}>
        <SafeAreaView style={{ backgroundColor: '#FFFFFF' }} />
        <TextInput
          placeholder="Search People"
          placeholderTextColor="#414142"
          style={{
            backgroundColor: '#FFFFFF',
            height: 50,
            fontSize: 28,
            color: 'black',
            borderBottomWidth: 2,
            borderBottomColor: '#000000'
          }}
          onChangeText={value => this.searchContacts(value)}
        />
        <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
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
      </View>
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