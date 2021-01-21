import React, { Component } from 'react';
import { Text, View } from 'react-native';

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

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './redux/reducers'
import thunk from 'redux-thunk'

const store = createStore(rootReducer, applyMiddleware(thunk));

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LandingScreen from './components/auth/Landing'
import RegisterScreen from './components/auth/Register'
import MainScreen from './components/Main'
import AddScreen from './components/main/Add'

const Stack = createStackNavigator();

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    };
  }
  
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if(!user) {
        this.setState({
          loggedIn: false,
          loaded: true,
        });
      } else {
        this.setState({
          loggedIn: true,
          loaded: true,
        });
      }
    });
  }

  render() {
    const { loggedIn, loaded } = this.state;

    if(!loaded) {
      return(
        <View style={{ flex : 1, justifyContent : 'center' }}>
          <Text>Loading...</Text>
        </View>
      );
    } 

    if(!loggedIn) {
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
      )
    }

    return(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator InitialRouteName="Main">
            <Stack.Screen name="Main" 
                          component={MainScreen} 
                          options={{ headerShown : false }} />
            <Stack.Screen name="Add" 
                          component={AddScreen}  />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}

export default App

