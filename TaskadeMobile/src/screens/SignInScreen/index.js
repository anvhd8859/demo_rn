import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    TextInput,
    Pressable,
    Alert,
    ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useMutation, gql} from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from './styles';

const SignUpScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    const SIGN_IN = gql`
        mutation signIn($email: String!, $password: String!) {
            signIn(input: {email: $email, password: $password}) {
                token
                user {
                    id
                    name
                    email
                }
            }
        }
    `;
    const [signIn, {data, error, loading}] = useMutation(SIGN_IN);
    useEffect(() => {
        if (error) {
            Alert.alert('Invalid email or password! Please try again.');
        }
    }, [error]);
    if (data) {
        // save token
        AsyncStorage.setItem('token', data.signIn.token).then(() => {
            // redirect to home screen
            navigation.navigate('Home');
        });
    }

    const handleSubmit = () => {
        signIn({variables: {email, password}});
    };

    return (
        <View>
            <TextInput
                placeholder="admin@gmail.com"
                placeholderTextColor={'#bfbfbf'}
                value={email}
                onChangeText={setEmail}
                style={styles.input}
            />
            <TextInput
                placeholder="password"
                placeholderTextColor={'#bfbfbf'}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                style={styles.input}
            />

            <Pressable
                disabled={loading}
                onPress={handleSubmit}
                style={styles.signIn}>
                {loading ? (
                    <ActivityIndicator />
                ) : (
                    <Text style={styles.signInText}>Sign In</Text>
                )}
            </Pressable>

            <Pressable
                onPress={() => navigation.navigate('SignUp')}
                style={styles.signUp}>
                <Text style={styles.signUpText}>New here? Sign up</Text>
            </Pressable>
        </View>
    );
};

export default SignUpScreen;
