import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    input: {
        color: '#fff',
        fontSize: 18,
        width: '90%',
        marginHorizontal: '5%',
        marginTop: '5%',
        borderColor: '#bfbfbf',
        borderWidth: 1,
        borderRadius: 5,
    },

    signIn: {
        backgroundColor: '#e33062',
        width: '90%',
        marginHorizontal: '5%',
        marginTop: '10%',
        height: 50,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    signInText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },

    signUp: {
        width: '90%',
        marginHorizontal: '5%',
        marginTop: '5%',
        height: 50,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    signUpText: {
        color: '#e33062',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default styles;
