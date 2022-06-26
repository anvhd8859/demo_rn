import React, {useState} from 'react';
import {
    View,
    Text,
    TextInput,
    Pressable,
    ActivityIndicator,
    Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useMutation, gql} from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';

const SignInScreen = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const navigation = useNavigation();
    const SIGN_UP = gql`
        mutation signUp($email: String!, $password: String!, $name: String!) {
            signUp(input: {email: $email, password: $password, name: $name}) {
                token
                user {
                    id
                    name
                    email
                }
            }
        }
    `;

    // mutation[0] is the function trigger the mutation
    //  mutation[1] is the object with the variables
    // {data, error, loading}
    const [singUp, {data, error, loading}] = useMutation(SIGN_UP);
    if (error) {
        Alert.alert('Error sign up!');
    }
    if (data) {
        // save token
        AsyncStorage.setItem('token', data.signUp.token).then(() => {
            // redirect to home screen
            navigation.navigate('Home');
        });
    }
    const handleSubmit = () => {
        // submit to server
        if (name && password && email) {
            singUp({variables: {email, password, name}});
        }
    };

    return (
        <View>
            <TextInput
                placeholder="Your name"
                placeholderTextColor={'#bfbfbf'}
                value={name}
                onChangeText={setName}
                style={styles.input}
            />
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
                style={styles.signUp}>
                {loading ? (
                    <ActivityIndicator />
                ) : (
                    <Text style={styles.signUpText}>Sign Up</Text>
                )}
            </Pressable>

            <Pressable
                disabled={loading}
                onPress={() => navigation.navigate('SignIn')}
                style={styles.signIn}>
                <Text style={styles.signInText}>
                    Already have an account? Sign in
                </Text>
            </Pressable>
        </View>
    );
};

export default SignInScreen;
