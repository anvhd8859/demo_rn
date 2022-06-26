import React from 'react';
import {Pressable} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

const Checkbox = props => {
    const {isChecked, onPress} = props;
    const name = isChecked ? 'check-square' : 'square';
    return (
        <Pressable onPress={onPress}>
            <Feather name={name} size={20} color="#fff" />
        </Pressable>
    );
};

export default Checkbox;
