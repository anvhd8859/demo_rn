import React from 'react';
import {View, Text, Pressable} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';

const ProjectItem = ({project}) => {
    const navigation = useNavigation();

    const onPress = () => {
        navigation.navigate('Todo', {id: project.id});
    };
    return (
        <Pressable onPress={onPress} style={styles.container}>
            <View style={styles.iconContainer}>
                <Feather name="file" size={24} color={'#bfbfbf'} />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.title}>{project.title}</Text>
                <Text style={styles.time}>{project.createdAt}</Text>
            </View>
        </Pressable>
    );
};

export default ProjectItem;
