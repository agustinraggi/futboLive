import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Image, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { API_KEY } from '@env';


export default function HomeScreen() {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append("x-rapidapi-key", API_KEY); 
    myHeaders.append("x-rapidapi-host", "v3.football.api-sports.io");

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch("https://v3.football.api-sports.io/leagues", requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('Error en la respuesta de la API');
        }
        return response.json();
      })
      .then(result => {
        if (result.response && Array.isArray(result.response)) {
          setData(result.response);
        } else {
          setError('No se encontraron ligas.');
        }
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
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

  // Filtramos las ligas en base al término de búsqueda
  const filteredData = data.filter(item =>
    item.league.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={24} color="gray" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar liga..."
          value={searchTerm}
          onChangeText={text => setSearchTerm(text)}
        />
      </View>
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.gridContainer}>
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <TouchableOpacity key={item.league.id} style={styles.leagueContainer} onPress={() => handleLogoPress(item.league.id)}>
                <Image source={{ uri: item.league.logo }} style={styles.logo} />
                <Text style={styles.leagueName}>{item.league.name}</Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text>No se encontraron ligas.</Text>
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
    marginTop: 95,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    height: 40,
    paddingLeft: 8,
    color: 'black',
  },
  searchIcon: {
    marginRight: 10,
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
    marginTop: 20,
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
});