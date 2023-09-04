/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import FlashCard from './components/FlashCard';
import NavBar from './components/NavBar';
import FileNav from './components/FileNav';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={styles.Home}>
      <NavBar />
      <View style={styles.NewCardHolder}>
        <FlashCard front="&new_icon& **New Set**"/>
      </View>
      <FileNav />
    </View>
  );
}

const styles = StyleSheet.create({
  NewCardHolder: {
    justifyContent: 'center', 
    alignItems: 'center'
  },
  Home: {
    backgroundColor: "#232020",
    height: "100%"
  }
});

export default App;
