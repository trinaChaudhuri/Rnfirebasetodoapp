import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import firebase from 'firebase';

const SigninScreen = ({navigation})=>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // const signIn = () => {
    //     return firebase.auth().signInWithEmailAndPassword(email, password)
    //       .then(navigation.navigate('Home'))
    //       .then((userCredential) => {
    //         // Signed in
    //         let user = userCredential.user;
    //       })
    //       .catch((error) => {
    //         setError(error.message);     
    //       });
      
    // }
//     const [phoneNumber, setPhoneNumber] = useState(null);
//   {auth().currentUser.phoneNumber}
//   firebase.auth().languageCode = 'it';
//   const [code, setCode] = useState('');

// const phoneNumber = getPhoneNumberFromUserInput();
// const appVerifier = window.recaptchaVerifier;
// firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
//     .then((confirmationResult) => {
//       // SMS sent. Prompt user to type the code from the message, then sign the
//       // user in with confirmationResult.confirm(code).
//       window.confirmationResult = confirmationResult;
//       // ...
//     }).catch((error) => {
//       // Error; SMS not sent
//       // ...
//     });
//     const code = getCodeFromUserInput();
//     confirmationResult.confirm(code).then((result) => {
//       // User signed in successfully.
//       const user = result.user;
//       // ...
//     }).catch((error) => {
//       // User couldn't sign in (bad verification code?)
//       // ...
//     });
//     var credential = firebase.auth.PhoneAuthProvider.credential(confirmationResult.verificationId, code);
//     firebase.auth().signInWithCredential(credential); const user = firebase.auth().currentUser;    


    const signIn = async () => {
        try {
            const response = await firebase.auth().signInWithEmailAndPassword(email, password);
            navigation.navigate('Home');
        } catch (err) {
            setError(err.message);
        }

    }
    return <>
        <Input
            label="Email"
            value={email}
            onChangeText={setEmail}
        />
        <Input
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
        />
        {
            error ?
                <Text style={{ color: 'red' }}>{error}</Text>
                : null
        }
        <Button title="SignIn" onPress={() => signIn()} />
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Text>Don't have an account?</Text>
        </TouchableOpacity>
        <Button title="SignUp" onPress={() => navigation.navigate('Signup')} /> 
    </>
};

export default SigninScreen;