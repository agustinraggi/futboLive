import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();
  const [leagues, setLeagues] = useState([]);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const timezone = "Europe/London"; // Especifica la zona horaria aquí

  useEffect(() => {
    const fetchData = async () => {
      const requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };

      try {
        // Obtén las ligas desde tu backend
        const leaguesResponse = await fetch("http://localhost:5000/api/leagues", requestOptions);
        if (!leaguesResponse.ok) {
          throw new Error('Error al obtener las ligas: ' + leaguesResponse.statusText);
        }
        const leaguesResult = await leaguesResponse.json();

        if (leaguesResult.response && Array.isArray(leaguesResult.response)) {
          setLeagues(leaguesResult.response);
          const leagueIds = leaguesResult.response.map(item => item.league.id); // Obtener IDs de ligas

          // Obtén los partidos de hoy desde tu backend
          const matchesPromises = leagueIds.map(leagueId => 
            fetch(`http://localhost:5000/api/fixtures?leagueId=${leagueId}&date=${new Date().toISOString().split('T')[0]}&timezone=${timezone}`, requestOptions)
              .then(response => {
                if (!response.ok) {
                  throw new Error('Error al obtener partidos para la liga ' + leagueId + ': ' + response.statusText);
                }
                return response.json();
              })
              .then(result => result.response || [])
          );

          const matchesByLeague = await Promise.all(matchesPromises);
          setMatches(matchesByLeague.flat()); // Aplana el array de partidos
        } else {
          setError('No se encontraron ligas.');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Cargando datos...</Text>
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

  const handleLogoPress = (leagueId) => {
    console.log(`Navegando a MatchesScreen con leagueId: ${leagueId}`);
    navigation.navigate('MatchesScreen', { leagueId });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.gridContainer}>
          {leagues.length > 0 ? (
            leagues.map((item) => (
              <TouchableOpacity key={item.league.id} style={styles.leagueContainer} onPress={() => handleLogoPress(item.league.id)}>
                <Image source={{ uri: item.league.logo }} style={styles.logo} />
                <Text style={styles.leagueName}>{item.league.name}</Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text>No se encontraron ligas.</Text>
          )}
        </View>

        {/* Muestra los partidos de hoy */}
        <View style={styles.matchesContainer}>
          <Text style={styles.matchesTitle}>Partidos de Hoy</Text>
          {matches.length > 0 ? (
            matches.map((match, index) => (
              <Text key={index} style={styles.match}>
                {match.teams.home.name} vs {match.teams.away.name} - {new Date(match.fixture.date).toLocaleString()} (Estado: {match.fixture.status.long})
              </Text>
            ))
          ) : (
            <Text>No hay partidos programados para hoy.</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 25,
  },
  scrollContent: {
    paddingBottom: 60,
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridContainer: {
    marginTop: 50,
    flexDirection: 'row',
    flexWrap: 'wrap', 
    justifyContent: 'space-between',
  },
  leagueContainer: {
    width: '30%',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: '100%',
    height: 100,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  leagueName: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  matchesContainer: {
    marginTop: 20,
    width: '100%',
  },
  matchesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  match: {
    fontSize: 16,
    marginVertical: 5,
  },
});
