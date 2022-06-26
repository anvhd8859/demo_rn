import React, {useEffect} from 'react';
import {View, TextInput} from 'react-native';
import Checkbox from '../Checkbox';
import styles from './styles';
import DeleteButton from '../DeleteButton';
import {useQuery, useMutation, gql} from '@apollo/client';

const UPDATE_TODO = gql`
    mutation ($id: ID!, $content: String!, $isCompleted: Boolean) {
        updateTodo(id: $id, content: $content, isCompleted: $isCompleted) {
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
const TodoItem = ({todo, onPress}) => {
    const [isChecked, setIsChecked] = React.useState(false);
    const [content, setContent] = React.useState('');
    useEffect(() => {
        if (!todo) {
            return;
        }
        setIsChecked(todo.isCompleted);
        setContent(todo.content);
    }, [todo]);

    const [updateTodo] = useMutation(UPDATE_TODO);
    const updateItem = () => {
        console.log('updateItem' + content + isChecked);
        updateTodo({
            variables: {
                id: todo.id,
                content: content,
                isCompleted: !isChecked,
            },
        });
    };

    return (
        <View style={styles.subContainer}>
            {/* Checkbox */}
            <Checkbox isChecked={isChecked} onPress={updateItem} />

            {/* Text input */}
            <TextInput
                value={content}
                onChangeText={setContent}
                style={styles.textInput}
                multiline
                onEndEditing={updateItem}
            />

            {/* Delete button */}
            <DeleteButton onPress={onPress} />
        </View>
    );
};

export default TodoItem;
