import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Header = () => {
    return (
        <View style={styles.header}>
            <View style={styles.containerHeader}>
            <Text style={styles.title}>FutboLive</Text>
            <View style={styles.searchContainer}>
                <TextInput 
                    style={styles.searchInput} 
                    placeholder="Buscar" 
                />
                <Ionicons name="search" size={24} color="white" />
            </View>
            </View>
            
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        backgroundColor: 'green',
        position: 'absolute',
        width: "100%",
    },
    containerHeader: {
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 130,
    },
    title: {
        fontSize: 20,
        color: 'white',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    searchInput: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 25,
        padding: 5,
        width: 100,
        marginRight: 5,
    },
});

export default Header;
