import React, {useEffect, useState} from 'react';
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


import FlashCard from '../FlashCard';
import NavBar from '../NavBar';
import FileNav from '../FileNav';

function Home(props: any): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  

  console.log("|" + props.uri + "|");
  
  
  

  return (
    <View style={styles.Home}>
      <NavBar />
      <View style={styles.NewCardHolder}>
        <FlashCard front="&new_icon& **New Set**" onclick={() => {console.log("click");}}/>
      </View>
      <FileNav uri={props.uri}/>
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

export default Home;

//https://blog.logrocket.com/how-to-access-file-systems-react-native/