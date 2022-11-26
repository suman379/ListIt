import {Button, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import {UserContext} from '../context/userContext';

const HomeScreen = () => {
  const {logout} = useContext(UserContext);

  return (
    <View>
      <SafeAreaView>
        <Button title="logout" onPress={logout}></Button>
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
