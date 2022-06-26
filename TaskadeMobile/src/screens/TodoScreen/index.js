import React, {useEffect, useState} from 'react';
import {
    View,
    TextInput,
    FlatList,
    Pressable,
    ScrollView,
    Alert,
} from 'react-native';
import TodoItem from '../../component/TodoItem';
import styles from './styles';
import Feather from 'react-native-vector-icons/Feather';
import CreateItem from '../../component/CreateItemButton';
import {useQuery, useMutation, gql} from '@apollo/client';
import {useRoute} from '@react-navigation/native';

const GET_PROJECT = gql`
    query ($id: ID!) {
        getTaskList(id: $id) {
            id
            title
            progress
            createdAt
            todos {
                id
                content
                isCompleted
            }
        }
    }
`;
const CREATE_TODO = gql`
    mutation ($content: String!, $taskId: ID!) {
        createTodo(content: $content, taskId: $taskId) {
            id
            content
            isCompleted
            taskList {
                id
                title
                createdAt
                progress
                todos {
                    id
                    content
                    isCompleted
                }
            }
        }
    }
`;
const TodoScreen = props => {
    const [project, setProject] = useState(null);
    const [todos, setTodo] = useState(project ? project.todos : []);
    const [title, setTitle] = useState('');
    const route = useRoute();

    //get todo
    const {data, error, loading} = useQuery(GET_PROJECT, {
        variables: {id: route.params.id},
    });
    useEffect(() => {
        if (error) {
            Alert.alert('Error fetching projects!', error.message);
        }
    }, [error]);
    useEffect(() => {
        if (data) {
            setProject(data.getTaskList);
            setTitle(data.getTaskList.title);
            setTodo(data.getTaskList.todos);
        }
    }, [data]);

    //create todo
    const [createTodo, {data: createTodoData, error: errorTodoData}] =
        useMutation(CREATE_TODO, {refetchQueries: [{query: GET_PROJECT}]});

    const createNewItem = () => {
        createTodo({
            variables: {
                content: '',
                taskId: route.params.id,
            },
        });
    };

    const deleteItem = atIndex => {
        console.log('deleteItem' + atIndex);
    };

    if (!project) {
        return null;
    }
    return (
        <View
            // behavior={Platform.OS === 'ios' ? 'position' : 'height'}
            style={styles.container}>
            <View style={styles.header}>
                <TextInput
                    style={styles.title}
                    value={title}
                    placeholder={'Title'}
                    placeholderTextColor={'#bfbfbf'}
                    onChangeText={setTitle}
                />
                <Pressable onPress={() => {}}>
                    <Feather name="refresh-ccw" size={22} color="white" />
                </Pressable>
            </View>

            <ScrollView style={styles.itemContainer}>
                <FlatList
                    data={todos}
                    renderItem={({item, index}) => (
                        <View style={styles.item}>
                            <TodoItem
                                todo={item}
                                onPress={() => deleteItem(index)}
                            />
                        </View>
                    )}
                    showsHorizontalScrollIndicator={false}
                />
            </ScrollView>

            <CreateItem onPress={createNewItem} />
        </View>
    );
};

export default TodoScreen;
