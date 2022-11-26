import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, Text} from 'react-native';
// here
import {
  SplashScreen,
  HomeScreen,
  EditNoteScreen,
  LoginScreen,
  SignupScreen,
} from './screens';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {UserContext} from './context/userContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

const App = () => {
  const [isLogedIn, setLogedIn] = useState(false);

  const login = () => {
    setLogedIn(true);
  };

  const logout = async () => {
    await AsyncStorage.removeItem('loggedUser');
    setLogedIn(false);
  };

  useEffect(() => {
    AsyncStorage.getItem('loggedUser')
      .then(data => {
        if (data !== null) {
          setLogedIn(true);
        }
      })
      .catch(err => console.log(err));
  }, []);
  return (
    <NavigationContainer>
      <UserContext.Provider value={{isLogedIn, login, logout, setLogedIn}}>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          {isLogedIn ? (
            <>
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Edit" component={EditNoteScreen} />
            </>
          ) : (
            <>
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Signup" component={SignupScreen} />
            </>
          )}
        </Stack.Navigator>
      </UserContext.Provider>
    </NavigationContainer>
  );
};

export default App;
