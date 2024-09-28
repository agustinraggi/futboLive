import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Header = () => {
    const navigation = useNavigation();
    const handleTitle = () => {
        navigation.navigate('Home');
    };

    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={handleTitle} style={styles.titleContainer}>
                <Text style={styles.title}>FutboLive</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        backgroundColor: 'green',
        position: 'absolute',
        width: '100%',
        top: 0,
    },
    titleContainer: {
        flex: 1,
        marginTop: 35,
    },
    title: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
    },
});

export default Header;