import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import firebase from 'firebase';

const SignupScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const signUp = async () => {
        try {
            const response = await firebase.auth().createUserWithEmailAndPassword(email, password);
            navigation.navigate('Signin');
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
        <Button title="SignUp" onPress={() => signUp()} />
        <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
            <Text>Already have an account? Sign In</Text>
        </TouchableOpacity>
    </>
};

export default SignupScreen;