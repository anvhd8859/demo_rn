import React from 'react';
import {Pressable} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

const DeleteButton = ({onPress}) => {
    return (
        <Pressable onPress={onPress}>
            <Feather name="trash-2" size={22} color="white" />
        </Pressable>
    );
};

export default DeleteButton;
