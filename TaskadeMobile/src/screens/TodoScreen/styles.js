import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5,
    },
    header: {
        padding: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#fff',
    },
    title: {
        width: '75%',
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    itemContainer: {
        marginLeft: '5%',
        borderColor: '#fff',
    },
    item: {
        flexDirection: 'row',
        padding: 10,
    },
});

export default styles;
