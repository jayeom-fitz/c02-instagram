import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyCeEnIwSHk8w5AzM6EctCpQOQhwM6lmpno",
  authDomain: "instagram-dev-76486.firebaseapp.com",
  projectId: "instagram-dev-76486",
  storageBucket: "instagram-dev-76486.appspot.com",
  messagingSenderId: "417165643284",
  appId: "1:417165643284:web:92676d6eb58e5063c76101",
  measurementId: "G-G9W3LHZPST"
};

if(firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LandingScreen from './components/auth/Landing'
import RegisterScreen from './components/auth/Register'


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator InitialRouteName="Landing">
        <Stack.Screen name="Landing" 
                      component={LandingScreen} 
                      options={{ headerShown : false }} />
        <Stack.Screen name="Register" 
                      component={RegisterScreen} />
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
