import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, ActivityIndicator } from 'react-native';
import axios from 'axios';

export default function HomeScreen() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios('http://localhost:3001/api/leagues')
      .then((res) => {
        if (Array.isArray(res.data.response)) {
          setData(res.data.response);
        } else {
          setData([]);
          console.error('La respuesta del servidor no contiene un array válido:', res.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError('Error fetching leagues');
        setLoading(false);
        console.error("Error fetching leagues:", err);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="green" />
        <Text>Cargando...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {data.map((league) => (
          <View key={league.id} style={styles.leagueContainer}>
            <Text style={styles.leagueTitle}>{league.name}</Text>
            <Image source={{ uri: league.logo }} style={styles.logo} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 60,
  },
  leagueContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  leagueTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  logo: {
    width: 100,
    height: 100,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
});
