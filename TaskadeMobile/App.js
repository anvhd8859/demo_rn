/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import Navigation from './src/navigation';
import {ApolloProvider} from '@apollo/client';
import {client} from './apollo_client/index';

const App: () => Node = () => {
    return (
        <ApolloProvider client={client}>
            <Navigation />
        </ApolloProvider>
    );
};

export default App;
