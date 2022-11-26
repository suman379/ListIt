import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useLayoutEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UserContext} from '../context/userContext';

const SplashScreen = ({navigation}) => {
  const {isLogedIn} = useContext(UserContext);
  useLayoutEffect(() => {
    const screen = isLogedIn ? 'Home' : 'Login';
    const time = isLogedIn ? 1000 : 0;

    setTimeout(() => {
      navigation.replace(screen);
    }, time);
  }, [isLogedIn]);

  return (
    <View>
      <SafeAreaView>
        <Text>SplashScreen</Text>
      </SafeAreaView>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
