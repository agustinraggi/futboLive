import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Footer = () => {
    return (
        <View style={styles.footer}>
            <TouchableOpacity style={styles.footerItem}>
                <Ionicons name="football" size={24} color="white" />
                <Text style={styles.textFooter}>Partidos</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.footerItem}>
                <Ionicons name="person" size={24} color="white" />
                <Text style={styles.textFooter}>Perfil</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 15,
        backgroundColor: 'green',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    textFooter: {
        color: 'white',
    },
    footerItem: {
        alignItems: 'center',
    },
});

export default Footer;
