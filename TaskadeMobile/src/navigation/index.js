import React from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ProjectsScreen from '../screens/ProjectsScreen';
import TodoScreen from '../screens/TodoScreen';
import SplashScreen from '../screens/SplashScreen';

const Stack = createNativeStackNavigator();
const MyTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: 'rgb(255, 45, 85)',
        background: 'rgb(20, 20, 20)',
        card: 'rgb(40, 40, 40)',
        text: 'rgb(255, 255, 255)',
        border: 'rgb(199, 199, 204)',
        notification: 'rgb(255, 69, 58)',
    },
};
const Navigation = () => {
    return (
        <NavigationContainer theme={MyTheme}>
            <Stack.Navigator>
                <Stack.Screen
                    name="Splash"
                    component={SplashScreen}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="SignIn"
                    component={SignInScreen}
                    options={{title: 'Sign In'}}
                />
                <Stack.Screen
                    name="SignUp"
                    component={SignUpScreen}
                    options={{title: 'Sign Up'}}
                />
                <Stack.Screen name="Home" component={ProjectsScreen} />
                <Stack.Screen name="Todo" component={TodoScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;
