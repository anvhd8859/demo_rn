import {StyleSheet, Dimensions} from 'react-native';

const styles = StyleSheet.create({
    carContainer: {
        width: '100%',
        height: Dimensions.get('window').height,
    },
    titles: {
        marginTop: '20%',
        width: '100%',
        alignItems: 'center',
    },
    title: {
        fontSize: 34,
        fontWeight: '600',
        color: '#000',
    },
    sbuTitle: {
        fontSize: 14,
        color: '#5c5e62',
    },
    subTitleCTA: {
        textDecorationLine: 'underline',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        position: 'absolute',
    },
    buttonsContainer: {
        position: 'absolute',
        width: '100%',
        bottom: 40,
    },
});

export default styles;
