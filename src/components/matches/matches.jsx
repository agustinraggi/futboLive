import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

const MatchesScreen = ({ route }) => {
    const { leagueId } = route.params; 
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append("x-rapidapi-key", "dc6441bc575098156718e131cc52ee99"); 
    myHeaders.append("x-rapidapi-host", "v3.football.api-sports.io");

    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch(`https://v3.football.api-sports.io/fixtures?league=${leagueId}`, requestOptions)
        .then(response => {
        if (!response.ok) {
            throw new Error('Error en la respuesta de la API');
        }
        return response.json();
        })
        .then(result => {
        if (result.response && Array.isArray(result.response)) {
            setMatches(result.response);
        } else {
            setError('No se encontraron partidos.');
        }
        setLoading(false);
        })
        .catch(err => {
        setError(err.message);
        setLoading(false);
        });
    }, [leagueId]);

if (loading) {
    return (
        <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text>Cargando partidos...</Text>
        </View>
    );
}

if (error) {
    return (
        <View style={styles.loadingContainer}>
            <Text>{error}</Text>
        </View>
        );
    }

return (
    <View style={styles.container}>
        <Text style={styles.title}>Partidos de hoy:</Text>
        {matches.length > 0 ? (
        matches.map(match => (
            <View key={match.fixture.id} style={styles.matchContainer}>
            <Text>{match.teams.home.name} vs {match.teams.away.name}</Text>
            <Text>{new Date(match.fixture.date).toLocaleString()}</Text>
            <Text>hola</Text>
            </View>
        ))
        ) : (
        <Text>No hay partidos programados para hoy.</Text>
        )}
    </View>
    );
};

const styles = StyleSheet.create({
        container: {
        flex: 1,
        padding: 20,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    matchContainer: {
        marginBottom: 10,
    },
});

export default MatchesScreen;
