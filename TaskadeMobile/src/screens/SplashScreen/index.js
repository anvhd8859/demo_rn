import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from './styles';

const SplashScreen = () => {
    const navigation = useNavigation();
    useEffect(() => {
        const checkLogin = async () => {
            if (await isAuthenticated()) {
                navigation.navigate('Home');
            } else {
                navigation.navigate('SignIn');
            }
        };
        checkLogin();
    });

    const isAuthenticated = async () => {
        // await AsyncStorage.removeItem('token');
        const token = await AsyncStorage.getItem('token');
        return !!token;
    };

    return (
        <View style={styles.container}>
            <ActivityIndicator />
        </View>
    );
};

export default SplashScreen;
