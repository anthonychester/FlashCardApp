/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import { useColorScheme, Alert, BackHandler} from 'react-native';

import Home from './components/pages/home'
import Loading from './components/loading'

import AsyncStorage from '@react-native-async-storage/async-storage';
import DocumentPicker from 'react-native-document-picker';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  if(true) {
    return (
      <Home />
    );
  } else {
    return (
      <Loading />
    );
  }
}

function error(mes: string) {
  Alert.alert('Error', mes, [
    {
      text: 'OK',
      onPress: () => BackHandler.exitApp()
    }
  ]);
}

export default App;

/*
const storeData = async (value) => {
  try {
    await AsyncStorage.setItem('my-key', value);
  } catch (e) {
    // saving error
  }
};
*/