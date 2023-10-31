/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import { useColorScheme, Alert, BackHandler} from 'react-native';

import Home from './components/pages/home';
import Overview from './components/pages/overview';
import EditSet from './components/pages/editset';
import Study from './components/pages/study';

import AsyncStorage from '@react-native-async-storage/async-storage';
import DocumentPicker from 'react-native-document-picker';
import Loading from './components/loading';


  
function App(): JSX.Element {
  const [screen, setScreenVar] = useState("Home");
  const [data, setDataVar] = useState({});

  function setScreen(name: string, newData: any) {
    //console.log("Name: ", name, screen);
    setScreenVar(name);
    setDataVar(newData);
  }
  //const isDarkMode = useColorScheme() === 'dark';
    switch (screen) {
      case "Home":
      return <Home data={data} setScreen={setScreen}/>;
      case "Edit":
      return <Overview data={data} setScreen={setScreen}/>;
      case "EditSet":
      return <EditSet data={data} setScreen={setScreen}/>;
      case "Study":
      return <Study data={data} setScreen={setScreen}/>
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