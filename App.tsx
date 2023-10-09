/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import { useColorScheme, Alert, BackHandler} from 'react-native';

import Home from './components/pages/home'
import Edit from './components/pages/edit'

import AsyncStorage from '@react-native-async-storage/async-storage';
import DocumentPicker from 'react-native-document-picker';
import Loading from './components/loading';


  
function App(): JSX.Element {
  const [screen, setScreenVar] = useState("Home");
  const [data, setDataVar] = useState({});

  function setScreen(name: string, newData: any) {
    console.log("Name: ", name, screen);
    setScreenVar(name);
    setDataVar(newData);
  }

  const isDarkMode = useColorScheme() === 'dark';
    switch (screen) {
      case "Home":
      return <Home data={data} setScreen={setScreen}/>;
      case "Edit":
      return <Edit data={data} setScreen={setScreen}/>;
      default:
      return <Loading />;
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