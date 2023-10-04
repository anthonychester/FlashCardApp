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

import RNFS from 'react-native-fs';

const BLANK = "\u001F"; //INFORMATION SEPARATOR ONE

function Home(props: any): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
    return (
    <View style={styles.Home}>
      <NavBar />
      <View style={styles.NewCardHolder}>
        <FlashCard front="&new_icon& **New Set**" onclick={() => {newSet()}}/>
      </View>
      <FileNav/>
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

function newSet() {
  let name = "New Set";
  let name_alo = "[" + name + BLANK.repeat(32-name.length) + "]";

  let nums_alo = "[" + 0 + BLANK.repeat(7) + "]";

  let file_cont = (name_alo + "\n") + (nums_alo + "\n").repeat(5) + "\n";
  //console.log("-----------\n"+file_cont+"-----------\n", file_cont.length);

  let d = new Date();
  let path = RNFS.DocumentDirectoryPath + "/Sets/" + d.toISOString() + ".mdcs";
  RNFS.writeFile(path.replaceAll(":","-"), file_cont, 'utf8')
    .then((success) => {
      //console.log('FILE WRITTEN!');
    })
    .catch((err) => {
      console.log(err.message);
    });
}

export default Home;