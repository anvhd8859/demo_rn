/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';

import CarList from './component/CarList';
import Header from './component/Header';

const App: () => Node = () => {
    return (
        <View style={styles.container}>
            <Header />
            <CarList />

            <StatusBar style="auto" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'black',
    },
});

export default App;
