import React, {useEffect} from 'react';
import {View, Text, FlatList, Alert} from 'react-native';
import ProjectItem from '../../component/ProjectItem';
import {useQuery, gql} from '@apollo/client';

import styles from './styles';

export const MY_PROJECTS = gql`
    query {
        myTaskList {
            id
            title
            createdAt
            progress
        }
    }
`;

const ProjectsScreen = props => {
    const [project, setProjects] = React.useState([
        {
            id: '1',
            title: 'Project 1',
            createdAt: '2d ago',
        },
        {
            id: '2',
            title: 'Project 2',
            createdAt: '3d ago',
        },
        {
            id: '3',
            title: 'Project 3',
            createdAt: '4d ago',
        },
    ]);
    const {data, error, loading} = useQuery(MY_PROJECTS);
    useEffect(() => {
        if (error) {
            Alert.alert('Error fetching projects!', error.message);
        }
    }, [error]);
    useEffect(() => {
        if (data) {
            setProjects(data.myTaskList);
        }
    }, [data]);

    return (
        <View style={styles.container}>
            <FlatList
                data={project}
                renderItem={({item}) => <ProjectItem project={item} />}
                style={styles.listItem}
            />
        </View>
    );
};

export default ProjectsScreen;
