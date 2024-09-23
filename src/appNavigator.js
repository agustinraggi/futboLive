import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Header from './components/header/header';
import Home from './components/home/home';
import Footer from "./components/footer/footer";

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Stack.Navigator
          screenOptions={{
            header: () => <Header />,
          }}
        >
          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
        <Footer />
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
