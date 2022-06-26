import React from 'react';
import {View, Text, Pressable} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import styles from './styles';

const CreateItem = ({onPress}) => {
    return (
        <View style={styles.createNewItem}>
            <Pressable onPress={onPress}>
                <View style={styles.createContainer}>
                    <Feather name="plus-square" size={22} color="white" />
                    <Text style={styles.newItemText}>Add new item</Text>
                </View>
            </Pressable>
        </View>
    );
};

export default CreateItem;
