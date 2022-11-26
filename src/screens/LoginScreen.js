import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';
import {useContext, useState} from 'react';
import {UserContext, useUserContext} from '../context/userContext';
import SignupScreen from './SignupScreen';
import logo from '../../assets/logo.png';
import CustomInput from '../components/customInput';
import CustomButton from '../components/CustomButton';
import passwords from '../data';
import AsyncStorage from '@react-native-async-storage/async-storage';
import data from '../data';

const LoginScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userError, setUserError] = useState(false);
  const [passError, setPassError] = useState(false);
  const {height: windowHeight} = useWindowDimensions();
  const {isLogedIn, login} = useContext(UserContext);
  const onPressSignIn = async () => {
    // Checking for empty input setting Error flags accordingly for rendering borders of TextInput el
    if (username.trim().length < 1) {
      setUserError(true);
    } else setUserError(false);
    if (password.trim().length < 1) {
      setPassError(true);
    } else setPassError(false);

    // look for valid user, return if no valid user
    const valid = data.filter(
      obj => obj.username === username && obj.password === password,
    ).length;
    if (!valid) return;

    // setting the current logged in user in storage
    try {
      await AsyncStorage.setItem('loggedUser', username);
      login();
      //navigation.replace('Home');
    } catch (error) {
      console.log({error});
    }

    // signIn();
  };
  const onPressSignUp = () => {
    console.warn('Press signUp from LoginScreen');
    // signUp();
  };
  return (
    <ScrollView contentContainerStyle={styles.scrollview}>
      <View style={styles.root}>
        <Image
          source={logo}
          style={[styles.logo, {height: windowHeight * 0.3}]}
          resizeMode="contain"
        />
        <CustomInput
          placeholder="Username"
          value={username}
          setValue={setUsername}
          errorState={userError}></CustomInput>
        <CustomInput
          placeholder="Password"
          value={password}
          setValue={setPassword}
          secureTextEntry
          errorState={passError}></CustomInput>
        <CustomButton onPress={onPressSignIn} text="Sign In"></CustomButton>
        <CustomButton
          onPress={onPressSignUp}
          text="Dont have an account yet? Sign Up!"
          type="signUp"></CustomButton>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#f9fbfc',
    // height:'100%'
  },
  logo: {
    width: '70%',
    // height:'30%',
    maxWidth: 500,
    maxHeight: 200,
  },
  scrollview: {
    minHeight: '100%',
  },
});

export default LoginScreen;
