import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
        padding: 10,
    },
    iconContainer: {
        width: 24,
        height: 24,
        backgroundColor: '#404040',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        marginRight: 10,
    },
    textContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 14,
        marginRight: 7,
        color: '#fff',
    },
    time: {
        color: 'darkgrey',
    },
});

export default styles;
