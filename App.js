import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { creacteStackNavigator } from '@react-navigation/stack';

import LandingScreen from './components/auth/Landing'

const stack = creacteStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator InitialRouteName="Landing">
        <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown : false }} />
      </Stack.Navigator>
    </NavigationContainer> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
