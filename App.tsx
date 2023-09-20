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

  const [folderURI, setFolderURI] = useState('');

  AsyncStorage.getItem("folder-uri")
  .then((furi)=> {
    //console.log(furi);
    if(furi || folderURI) {
      //console.log("found");
      //setFolderURI
    } else {
      //console.log("not found");
      DocumentPicker.pickDirectory().then((uri) => {
        //console.log(data.uri);
        //add to AsyncStorage
        if(uri && uri.uri) {
           //decodeURIComponent
          let loc = decodeURIComponent(JSON.stringify(uri.uri));
          let s = loc.indexOf(":");
          loc = loc.slice(s+1);
          s = loc.indexOf(":");
          loc = loc.slice(s+1);

          setFolderURI(loc.slice(0, loc.length-1));
        } else {
          error('Local Data Not Found');
        }
      });
    }
  })
  .catch((e) => {
    error('Local Data Not Found');
  });

  if(folderURI) {
    return (
      <Home uri={folderURI}/>
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