import React from 'react';
import {Text, View, ImageBackground} from 'react-native';
import StyleButton from '../StyleButton';

import styles from './styles';

const CarItem = props => {
    const {name, tagline, taglineCTA, image} = props.car;

    return (
        <View style={styles.carContainer}>
            <ImageBackground source={image} style={styles.image} />
            <View style={styles.titles}>
                <Text style={styles.title}>{name}</Text>
                <Text style={styles.subTitle}>
                    {tagline}&nbsp;
                    <Text style={styles.subTitleCTA}>{taglineCTA}</Text>
                </Text>
            </View>

            <View style={styles.buttonsContainer}>
                <StyleButton
                    type="primary"
                    content="custom order"
                    onPress={() => {
                        console.warn('Custom order pressed button');
                    }}
                />

                <StyleButton
                    type="secondary"
                    content="existing inventory"
                    onPress={() => {
                        console.warn('Existing inventory pressed button');
                    }}
                />
            </View>
        </View>
    );
};

export default CarItem;
