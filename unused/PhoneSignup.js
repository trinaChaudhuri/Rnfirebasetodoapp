import React, {useState} from 'react';
import {
  StatusBar,
  Text,
  TextInput,
  ActivityIndicator,
  SafeAreaView,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
import firebase from 'firebase';

const PhoneSignup = ({navigation}) => {
  
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [sentCode, setSentCode] = useState(null);
  const [code, setCode] = useState('');

  const errorHandler = ({title, message}) => {
    return Alert.alert(title, message, [
      {
        text: 'Close',
        onPress: () => console.log('Alert closed'),
      },
    ]);
  };

  const onPressHandler = async () => {
    setLoading(true);

    try {
      const body = {phone_number: phoneNumber};
      
      console.log('Firebase: signInWithPhoneNumber');
      const confirmation = await firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier);
      console.log('Firebase: signInWithPhoneNumber result', confirmation);


      setLoading(false);
      setSentCode(confirmation);
    } catch (e) {
      console.error(e);
      setLoading(false);

      errorHandler({
        title: 'Something went wrong',
        message: e.message,
      });
    }
  };

  const confirmationHandler = async () => {
    try {
      setLoading(true);

      const resp = await sentCode.confirm(code);
      setLoading(false);

      if (resp) {
        Alert.alert('Successfully logged in', '✅', [
          {
            text: 'Close',
            onPress: () => navigation.navigate('Home'),
          },
        ]);
      }
    } catch (e) {
      console.error(e);
      setLoading(false);
      // set `sentCode` to null resetting the UI
      setSentCode(null);
      errorHandler({
        title: 'Something went wrong',
        message: e.message,
      });
    }
  };

  return (
    <SafeAreaView style={styles.backgroundStyle}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.heading}>CHITS</Text>
      <View style={styles.form}>
        {sentCode ? (
          <View>
            <TextInput
              style={styles.textInput}
              placeholder="OTP"
              placeholderTextColor="#d3d3d3"
              onChangeText={text => setCode(text)}
              value={code}
            />
            {loading ? (
              <ActivityIndicator size="large" color="#00ff00" />
            ) : (
              <TouchableOpacity
                onPress={confirmationHandler}
                style={styles.button}>
                <Text style={styles.buttonText}>Verify</Text>
              </TouchableOpacity>
            )}
          </View>
        ) : (
          <View>
            <TextInput
              style={styles.textInput}
              keyboardType="phone-pad"
              placeholder="ex. +448023432345"
              placeholderTextColor="#d3d3d3"
              onChangeText={text => setPhoneNumber(text.replace(/\s+/g, ''))}
            />

            {loading ? (
              <ActivityIndicator size="large" color="#00ff00" />
            ) : (
              <TouchableOpacity onPress={onPressHandler} style={styles.button}>
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  heading: {
    fontSize: 50,
  },
  form: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  button: {
    elevation: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e67e22',
    color: '#ffffff',
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  paragraph: {
    fontSize: 12,
    borderBottomColor: '#e67e22',
  },
  buttonText: {
    color: '#ffffff',
  },
  textInput: {
    padding: 15,
    borderColor: '#20232a',
    borderWidth: 3,
    elevation: 7,
    height: 50,
    backgroundColor: '#fff',
    marginBottom: 10,
    width: 0.8 * Dimensions.get('window').width,
  },
});

export default PhoneSignup;